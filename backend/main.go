package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"
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
		fmt.Println("DB set, starting server")
	}

	go func() {
		for _ = range ticker.C {
			fmt.Println("Starting employees service")
			database.GetPublicEmps()
			database.SetSpecials()
		}

	}()

	router := mux.NewRouter()

	router.HandleFunc("/login", users.Login).Methods("POST")
	router.HandleFunc("/", home).Methods("GET")

	router.HandleFunc("/signup", middlewares.TokenVerifyMiddleware(users.Signup)).Methods("POST")
	router.HandleFunc("/clients", middlewares.TokenVerifyMiddleware(clients.GetClients)).Methods("GET")
	router.HandleFunc("/specials/clients", middlewares.TokenVerifyMiddleware(specials.GetSpecialClients)).Methods("GET")
	router.HandleFunc("/specials/top", middlewares.TokenVerifyMiddleware(specials.GetTopSpecials)).Methods("GET")

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS()(router)))
}

func home(w http.ResponseWriter, r *http.Request) {
	utils.ResponseJSON(w, "DB running at port 5432\nServer running at port 8080")
}
