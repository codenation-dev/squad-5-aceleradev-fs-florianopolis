package database

import (
	"database/sql"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
	"uati-api/models"
	"uati-api/publicemployees"

	_ "github.com/lib/pq" //postgres extansion moved to database package
	"github.com/subosito/gotenv"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB

func GetDB() *sql.DB {
	var err error
	if db != nil {
		return db
	}
	gotenv.Load()

	connectionString := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("PG_USER"), os.Getenv("PG_PASS"), os.Getenv("PG_DB"))

	db, err = sql.Open("postgres", connectionString)

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	return db
}

func SetDB() {
	if db == nil {
		GetDB()
	}
	var err error
	err = publicemployees.DownloadSpEmployees()
	if err != nil {
		fmt.Println("Error downloading file")
		panic(err)
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS publicEmployees (name text PRIMARY KEY , salary float8 DEFAULT 0);")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec("DELETE FROM publicEmployees WHERE true;")
	if err != nil {
		panic(err)
	}

	err = publicemployees.GetEmployeesFromCSV(db)
	if err != nil {
		fmt.Println("Error parsing data")
		panic(err)
	}
	fmt.Println("done")

	checkClientsTable()

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS users (id serial primary key ,email text not null  unique ,password text not null);")
	if err != nil {
		panic(err)
	}

	CreateUser(models.User{Email: "admin@admin.com", Password: "1234"})
}

func CreateUser(user models.User) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

	if err != nil {
		return err
	}

	user.Password = string(hash)

	stmt := "INSERT INTO users (email, password) VALUES ($1,$2) RETURNING id"

	db.QueryRow(stmt, user.Email, user.Password).Scan(&user.ID)

	return nil
}

func checkClientsTable() {
	_, err := db.Exec("CREATE TABLE IF NOT EXISTS clients (name text not null, salary float8 default 0);")

	if err != nil {
		panic(err)
	}

	if !tablePopulated() {
		populateTable()
	}

}

func tablePopulated() bool {
	var count int

	row := db.QueryRow("SELECT COUNT(name) FROM clients;")
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

	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}
