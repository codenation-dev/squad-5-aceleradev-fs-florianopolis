package clients

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"uati-api/database"
	"uati-api/models"
)

var db = database.GetDB()

func GetClients(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("Select * FROM clients;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	clients := []models.Client{}

	for rows.Next() {
		c := new(models.Client)

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

func UpdateSalary(w http.ResponseWriter, r *http.Request) {

	body, _ := ioutil.ReadAll(r.Body)
	client := new(models.Client)
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
