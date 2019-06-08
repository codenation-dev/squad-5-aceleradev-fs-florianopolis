package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"

	mydb "desafio-final/db"
	fetchEmps "desafio-final/fetch-public-emp"
)

//Client represent a client from db
type Client struct {
	Name   string  `json:"name"`
	Salary float64 `json:"salary"`
}

var db = mydb.Db

func main() {

	setdb := flag.Bool("setdb", false, "download csv and setup db on startup")
	flag.Parse()

	mydb.CheckTable()

	if *setdb {
		fetchEmps.Fetch()
		fmt.Println("DB set, starting server")
	}

	router := mux.NewRouter()
	router.HandleFunc("/", home).Methods("GET")
	router.HandleFunc("/clients", getClients).Methods("GET")
	router.HandleFunc("/updateSalary", updateSalary).Methods("PUT")

	http.ListenAndServe(":8080", router)

}

func home(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("DB running at port 5432\nServer running at port 8080"))
}

func getClients(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("Select * FROM clients;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	clients := []Client{}

	for rows.Next() {
		c := new(Client)

		rows.Scan(&c.Name, &c.Salary)

		clients = append(clients, *c)
	}

	var clientsJSON [][]byte
	for _, client := range clients {
		client, err := json.MarshalIndent(client, "", "	")
		if err != nil {
			log.Fatal(err)
		}
		clientsJSON = append(clientsJSON, client)
	}

	w.Write(bytes.Join(clientsJSON, []byte(",\n")))
}

func updateSalary(w http.ResponseWriter, r *http.Request) {

	body, _ := ioutil.ReadAll(r.Body)
	client := new(Client)
	json.Unmarshal(body, client)

	statement := fmt.Sprintf("UPDATE clients SET salary = %f WHERE name = '%s';", client.Salary, client.Name)
	result, err := db.Exec(statement)

	// err := row.Scan(&client.Name, &client.Salary)
	if err != nil {
		fmt.Println(err)
	}

	affected, _ := result.RowsAffected()
	if affected == 0 {
		w.Write([]byte(fmt.Sprintf("client %s not found", client.Name)))
		return
	}

	// clientJSON, err := json.MarshalIndent(client, "", "	")
	// if err != nil {
	// 	log.Fatal(err)
	// }

	w.Write(body)
}
