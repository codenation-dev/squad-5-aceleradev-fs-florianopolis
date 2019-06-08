package db

import (
	"database/sql"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
)

var connectionString = fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
	"postgres", "postgres", "postgres")

//Db is the connection to the db
var Db, dberr = sql.Open("postgres", connectionString)

//CheckTable checks if table exists and is populated
func CheckTable() {
	_, err := Db.Exec("CREATE TABLE IF NOT EXISTS clients (name text not null, salary float8 default 0);")

	if err != nil {
		panic(err)
	}

	if !tablePopulated() {
		populateTable()
	}

}

func tablePopulated() bool {
	var count int

	row := Db.QueryRow("SELECT COUNT(name) FROM clients;")
	err := row.Scan(&count)
	if err != nil {
		log.Fatal(err)
	}

	if count == 0 {
		return false
	}
	return true
}

func populateTable() {
	statementValues := []string{}

	csvFile, err := os.Open("clientes.csv")
	reader := csv.NewReader(csvFile)
	if err != nil {
		panic(err)
	}
	defer csvFile.Close()

	for {
		line, err := reader.Read()

		if err == io.EOF {
			break
		} else if err != nil {
			panic(err)
		}
		value := fmt.Sprintf("('%s')", line[0])

		statementValues = append(statementValues, value)

	}
	stringFiles := strings.Join(statementValues[:], ",\n")

	sqlStatement := fmt.Sprintf("INSERT INTO clients (name)\nVALUES\n%s;", stringFiles)

	_, err = Db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}
