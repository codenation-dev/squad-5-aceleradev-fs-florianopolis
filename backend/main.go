package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"
	"uati-api/alerts"
	"uati-api/clients"
	"uati-api/database"
	"uati-api/middlewares"
	"uati-api/specials"
	"uati-api/users"
	"uati-api/utils"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"github.com/subosito/gotenv"
)

//Db is the connection to the db
var db = database.GetDB()

func init() {
	gotenv.Load()
}

func main() {
	ticker := time.NewTicker(24 * time.Hour)

	setdb := flag.Bool("setdb", false, "download csv and setup db on startup")
	flag.Parse()
	if *setdb {
		database.SetDB()
		go func() {
			database.GetPublicEmps()
			database.SetSpecials()
			alerts.SendAlerts()
		}()
		fmt.Println("DB set, starting server")
	}

	go func() {
		for _ = range ticker.C {
			fmt.Println("Starting employees service")
			database.GetPublicEmps()
			database.SetSpecials()
			alerts.SendAlerts()
		}

	}()

	router := mux.NewRouter()

	router.HandleFunc("/api/login", users.Login).Methods("POST")
	router.HandleFunc("/api/", home).Methods("GET")

	router.HandleFunc("/api/signup", middlewares.TokenVerifyMiddleware(users.Signup)).Methods("POST")
	router.HandleFunc("/api/users", middlewares.TokenVerifyMiddleware(users.GetUsers)).Methods("GET")
	router.HandleFunc("/api/clients", middlewares.TokenVerifyMiddleware(clients.GetClients)).Methods("GET")
	router.HandleFunc("/api/clients/upload", middlewares.TokenVerifyMiddleware(clients.UploadClients)).Methods("POST")
	router.HandleFunc("/api/specials/clients", middlewares.TokenVerifyMiddleware(specials.GetSpecialClients)).Methods("GET")
	router.HandleFunc("/api/specials/top", middlewares.TokenVerifyMiddleware(specials.GetTopSpecials)).Methods("GET")
	router.HandleFunc("/api/alerts", middlewares.TokenVerifyMiddleware(alerts.GetAlerts)).Methods("GET")

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST"})

	log.Fatal(http.ListenAndServe(":8081", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}

func home(w http.ResponseWriter, r *http.Request) {
	utils.ResponseJSON(w, "DB running at port 5432\nServer running at port 8080")
}
