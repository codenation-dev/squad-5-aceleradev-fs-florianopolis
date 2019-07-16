package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"uati-api/clients"
	"uati-api/database"
	"uati-api/middlewares"
	"uati-api/users"

	"github.com/gorilla/mux"

	"github.com/subosito/gotenv"
)

//Db is the connection to the db
var db = database.GetDB()

func init() {
	gotenv.Load()
}

func main() {
	setdb := flag.Bool("setdb", false, "download csv and setup db on startup")
	flag.Parse()

	if *setdb {
		database.SetDB()
		fmt.Println("DB set, starting server")
	}

	router := mux.NewRouter()

	router.HandleFunc("/login", users.Login).Methods("POST")
	router.HandleFunc("/", home).Methods("get")

	router.HandleFunc("/signup", middlewares.TokenVerifyMiddleware(users.Signup)).Methods("POST")
	router.HandleFunc("/clients", middlewares.TokenVerifyMiddleware(clients.GetClients)).Methods("GET")
	router.HandleFunc("/updateSalary", middlewares.TokenVerifyMiddleware(clients.UpdateSalary)).Methods("PUT")

	log.Fatal(http.ListenAndServe(":8080", router))
}

func home(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("DB running at port 5432\nServer running at port 8080"))
}
