package specials

import (
	"encoding/json"
	"log"
	"net/http"
	"uati-api/database"
	"uati-api/models"
)

var db = database.GetDB()

func GetTopSpecials(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT * FROM specials ORDER BY salary DESC limit 20;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	specials := new(models.SpecialsResponse)

	for rows.Next() {
		s := new(models.Special)

		rows.Scan(&s.Name, &s.Salary, &s.IsClient, &s.AlertSent)

		specials.Specials = append(specials.Specials, *s)
	}
	response, err := json.Marshal(specials)
	if err != nil {
		log.Fatal(err)
	}

	w.Write(response)
}

func GetSpecialClients(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("Select * FROM specials WHERE isClient=true")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	clients := new(models.SpecialsResponse)

	for rows.Next() {
		s := new(models.Special)

		rows.Scan(&s.Name, &s.Salary, &s.IsClient, &s.AlertSent)

		clients.Specials = append(clients.Specials, *s)
	}
	response, err := json.Marshal(clients)
	if err != nil {
		log.Fatal(err)
	}

	w.Write(response)
}
