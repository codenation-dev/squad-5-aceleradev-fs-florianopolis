package clients

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"uati-api/alerts"
	"uati-api/database"
	"uati-api/models"
	"uati-api/utils"
)

var db = database.GetDB()

func GetClients(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("Select name FROM clients;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	clients := new(models.ClientsResponse)

	for rows.Next() {
		c := new(models.Client)

		rows.Scan(&c.Name)

		clients.Clients = append(clients.Clients, *c)
	}
	response, err := json.Marshal(clients)
	if err != nil {
		log.Fatal(err)
	}

	w.Write(response)
}

func UploadClients(w http.ResponseWriter, req *http.Request) {
	var error models.Error
	file, _, err := req.FormFile("clients")
	if err != nil {
		error.Message = "File not found"
		utils.RespondWithError(w, http.StatusBadRequest, error)
		return
	}
	defer file.Close()

	f, err := os.OpenFile("./clientes.csv", os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		error.Message = "Error writing file"
		utils.RespondWithError(w, http.StatusInternalServerError, error)
		return
	}
	defer f.Close()
	io.Copy(f, file)

	go func() {
		database.RepopulateTable()
		database.SetSpecials()
		alerts.SendAlerts()
	}()

	response := models.SuccessResponse{"Clients uploaded"}
	utils.ResponseJSON(w, response)
}
