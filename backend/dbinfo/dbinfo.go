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

	rows, err := db.Query("Select salary FROM clients;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var salaries []float64

	for rows.Next() {
		var salary float64

		rows.Scan(&salary)

		salaries = append(salaries, salary)
	}
	salariesPie := new(models.SalariesPie)
	for _, salary := range salaries {
		if salary < 5000 {
			salariesPie.Sub5++
			continue
		}
		if salary < 10000 {
			salariesPie.Sub10++
			continue
		}
		if salary < 15000 {
			salariesPie.Sub15++
			continue
		}
		if salary < 20000 {
			salariesPie.Sub20++
			continue
		}
		salariesPie.Over20++
	}

	responseObj := new(models.ResponseDbInfo)
	responseObj.ClientsSalary = *salariesPie
	responseObj.AvgSalaries = *info

	response, err := json.Marshal(responseObj)
	if err != nil {
		fmt.Println(err)
	}

	w.Write(response)
}
