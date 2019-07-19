package clients

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"uati-api/database"
	"uati-api/models"
)

var db = database.GetDB()

func GetClients(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("Select name FROM clients;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	clients := []models.Client{}

	for rows.Next() {
		c := new(models.Client)

		rows.Scan(&c.Name)

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
