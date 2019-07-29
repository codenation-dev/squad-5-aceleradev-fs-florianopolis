package dbinfo

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"uati-api/database"
	"uati-api/models"
)

var db = database.GetDB()

func GetGraphicsInfo(w http.ResponseWriter, r *http.Request) {
	info := new(models.GraphicsInfo)
	var wg sync.WaitGroup

	wg.Add(2)
	go func() {
		row := db.QueryRow("select avg(c.salary) as clients_avg ,avg(s.salary) as speciasl_avg, avg(sc.salary) as special_clients_avg from specials s,clients c, (SELECT * from specials where isclient=true) sc;")
		defer wg.Done()
		err := row.Scan(&info.AvgClientsSalary, &info.AvgSpecialsSalary, &info.AvgSpecialClientsSalary)
		if err != nil {
			log.Println(err)
		}
	}()
	go func() {
		row := db.QueryRow("select count(s.name) as total from specials s where s.salary>(SELECT avg(salary) from specials where isclient=true) and isclient is not true;")
		defer wg.Done()
		err := row.Scan(&info.OverClientsAvgSpecials)
		if err != nil {
			log.Println(err)
		}
	}()
	wg.Wait()
	response, err := json.Marshal(info)
	if err != nil {
		log.Fatal(err)
	}

	w.Write(response)
}
