package dbinfo

import (
	"encoding/json"
	"fmt"
	"net/http"
	"uati-api/database"
	"uati-api/models"
)

var db = database.GetDB()

func GetGraphicsInfo(w http.ResponseWriter, r *http.Request) {
	info := new(models.GraphicsInfo)
	row := db.QueryRow("select * from salariesavg")
	err := row.Scan(&info.AvgClientsSalary, &info.AvgSpecialsSalary, &info.AvgSpecialClientsSalary, &info.OverClientsAvgSpecials)
	if err != nil {
		fmt.Println(err)
	}
	response, err := json.Marshal(info)
	if err != nil {
		fmt.Println(err)
	}

	w.Write(response)
}
