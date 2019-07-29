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
	"uati-api/dbinfo"
	"uati-api/middlewares"
	"uati-api/specials"
	"uati-api/users"

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
	ticker := time.NewTicker(12 * time.Hour)

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
			database.RepopulateTable()
		}

	}()

	router := mux.NewRouter()

	router.HandleFunc("/api/login", users.Login).Methods("POST")
	router.HandleFunc("/api/signup", middlewares.TokenVerifyMiddleware(users.Signup)).Methods("POST")
	router.HandleFunc("/api/users", middlewares.TokenVerifyMiddleware(users.GetUsers)).Methods("GET")
	router.HandleFunc("/api/users/{user}", middlewares.TokenVerifyMiddleware(users.UpdateUser)).Methods("PUT")
	router.HandleFunc("/api/clients", middlewares.TokenVerifyMiddleware(clients.GetClients)).Methods("GET")
	router.HandleFunc("/api/clients/upload", middlewares.TokenVerifyMiddleware(clients.UploadClients)).Methods("POST")
	router.HandleFunc("/api/specials/clients", middlewares.TokenVerifyMiddleware(specials.GetSpecialClients)).Methods("GET")
	router.HandleFunc("/api/specials/top", middlewares.TokenVerifyMiddleware(specials.GetTopSpecials)).Methods("GET")
	router.HandleFunc("/api/alerts", middlewares.TokenVerifyMiddleware(alerts.GetAlerts)).Methods("GET")
	router.HandleFunc("/api/dbinfo/avgSalaries", middlewares.TokenVerifyMiddleware(dbinfo.GetGraphicsInfo)).Methods("GET")

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT"})

	sh := http.StripPrefix("/api/", http.FileServer(http.Dir("./swaggerui/")))
	router.PathPrefix("/api/").Handler(sh)

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}
