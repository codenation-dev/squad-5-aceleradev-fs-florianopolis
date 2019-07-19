package specials

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"uati-api/database"
	"uati-api/models"
)

var db = database.GetDB()

func GetTopSpecials(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT * FROM specials WHERE alertsent=false ORDER BY salary DESC limit 20;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	specials := []models.Special{}

	for rows.Next() {
		s := new(models.Special)

		rows.Scan(&s.Name, &s.Salary, &s.IsClient, &s.AlertSent)

		specials = append(specials, *s)
	}

	var specialsJSON [][]byte
	for _, special := range specials {
		client, err := json.MarshalIndent(special, "", "	")
		if err != nil {
			log.Fatal(err)
		}
		specialsJSON = append(specialsJSON, client)
	}

	w.Write(bytes.Join(specialsJSON, []byte(",\n")))
}

func GetSpecialClients(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("Select * FROM specials WHERE isClient=true")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	clients := []models.Special{}

	for rows.Next() {
		c := new(models.Special)

		rows.Scan(&c.Name, &c.Salary, &c.IsClient, &c.AlertSent)

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
