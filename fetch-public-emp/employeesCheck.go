package fetchpublicemp

import (
	"fmt"
	"strings"

	mydb "desafio-final/db"
)

var db = mydb.Db

func checkEmployees(employees []Employee) {

	statementValues := []string{}

	for _, emp := range employees {

		value := fmt.Sprintf("('%s', %f)", emp.Name, emp.Salary)

		statementValues = append(statementValues, value)

	}

	stringValues := strings.Join(statementValues[:], ",\n")

	sqlStatement := fmt.Sprintf("INSERT INTO publicemployees (name, salary) VALUES %s;", stringValues)
	// fmt.Println(sqlStatement)
	_, err := db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}
