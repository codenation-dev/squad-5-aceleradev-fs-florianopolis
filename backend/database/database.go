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

	connectionString := fmt.Sprintf("host=uati-db user=%s password=%s dbname=%s sslmode=disable",
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

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS publicEmployees (name text PRIMARY KEY , salary float8 DEFAULT 0);")
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS specials (name text not null UNIQUE ,salary float8 default 0, isClient boolean ,alertSent boolean default false);")
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS clients (name text not null, isClient boolean default true,salary float8 default 0);")
	if err != nil {
		log.Println(err)
		return
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS users (id serial primary key ,email text not null  unique,name text not null ,password text not null,super_user boolean default false);")
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS alerts (sent_to text NOT NULL,client boolean DEFAULT false,name text NOT NULL,sent_at TIMESTAMP DEFAULT NOW());")
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec("	create table if not exists  salariesavg (clients_avg float8,specials_avg float8, special_clients_avg float8 ,overTheAvg integer);")
	if err != nil {
		log.Println(err)
		return
	}

	CreateUser(models.User{Email: "squad5codenation@gmail.com", Name: "admin", Password: "1234"})
}

func GetPublicEmps() {
	err := publicemployees.DownloadSpEmployees()
	if err != nil {
		log.Println("Error downloading employees, stoping employees update", err)
		return
	}
	_, err = db.Exec("DELETE FROM publicEmployees WHERE true;")
	if err != nil {
		log.Println(err)
	}
	err = publicemployees.GetEmployeesFromCSV(db)
	if err != nil {
		log.Println("Error downloading employees, stoping employees update", err)
		return
	}
	fmt.Println("done")
}

func SetSpecials() {
	_, err := db.Exec("INSERT INTO specials SELECT  * FROM (SELECT p.name AS name , p.salary as salary, isClient FROM publicEmployees p LEFT JOIN clients c ON c.name=p.name WHERE p.salary > 19999) s WHERE NOT EXISTS(SELECT  name FROM specials WHERE name = s.name);")
	if err != nil {
		log.Println("Error updating specials.", err)
		return
	}
	_, err = db.Exec("UPDATE specials SET  isClient=c.isClient,alertsent=false FROM clients c WHERE specials.name=c.name AND specials.isClient IS NOT TRUE;")
	if err != nil {
		log.Println("Error updating specials.", err)
		return
	}

}

func CreateUser(user models.User) (int, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

	if err != nil {
		return 0, err
	}

	user.Password = string(hash)

	stmt := "INSERT INTO users (email,name, password) VALUES ($1,$2,$3) RETURNING id"

	db.QueryRow(stmt, user.Email, user.Name, user.Password).Scan(&user.ID)

	return user.ID, nil
}

func UpdateUser(user models.User) (bool, error) {
	if user.Password != "" {
		hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
		if err != nil {
			return false, err
		}
		user.Password = string(hash)
		stmt := "UPDATE users2 SET password = $1 WHERE id = $2"
		db.QueryRow(stmt, user.Password, user.ID)
	}
	if user.Name != "" {
		stmt := "UPDATE users2 SET name = $1 WHERE id = $2"
		db.QueryRow(stmt, user.Name, user.ID)
	}
	if user.Email != "" {
		stmt := "UPDATE users2 SET email = $1 WHERE id = $2"
		db.QueryRow(stmt, user.Email, user.ID)
	}
	return true, nil
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

func RepopulateClientsTable() {
	statementValues := []string{}
	_, err := db.Exec("DELETE FROM clients WHERE TRUE;")
	if err != nil {
		log.Println(err)
		return
	}

	csvFile, err := os.Open("clientes.csv")
	reader := csv.NewReader(csvFile)
	if err != nil {
		log.Println("Error reading clients csv.", err)
		return
	}
	defer csvFile.Close()

	for {
		line, err := reader.Read()

		if err == io.EOF {
			break
		} else if err != nil {
			log.Println("Error reading clients csv.", err)
			return
		}
		value := fmt.Sprintf("('%s')", line[0])

		statementValues = append(statementValues, value)

	}
	stringFiles := strings.Join(statementValues[:], ",\n")

	sqlStatement := fmt.Sprintf("INSERT INTO clients (name)\nVALUES\n%s;", stringFiles)

	_, err = db.Exec(sqlStatement)
	if err != nil {
		log.Println(err)
	}

	_, err = db.Exec("update clients set salary=p.salary from publicemployees p where p.name=clients.name;")
	if err != nil {
		log.Println(err)
	}
}

func UpdateInfo() {
	_, err := db.Exec("DELETE FROM salariesavg where true;")
	if err != nil {
		log.Println(err)
	}
	_, err = db.Exec("insert into salariesavg (select avg(c.salary) as clients_avg ,avg(s.salary) as specials_avg, avg(sc.salary) as special_clients_avg from specials s,clients c, (SELECT * from specials where isclient=true) sc);")
	if err != nil {
		log.Println(err)
	}

	_, err = db.Exec("update salariesavg set overTheAvg=(select count(s.name) as total from specials s where s.salary>(SELECT avg(salary) from specials where isclient=true) and isclient is not true) where true;")
	if err != nil {
		log.Println(err)
	}
}
