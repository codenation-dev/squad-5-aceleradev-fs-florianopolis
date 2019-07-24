package publicemployees

import (
	"database/sql"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"strings"
	"sync"
	"uati-api/models"
)

func GetEmployeesFromCSV(db *sql.DB) error {
	csvFile, err := os.Open("remuneracao.csv")
	reader := csv.NewReader(csvFile)
	reader.Comma = ';'
	if err != nil {
		return fmt.Errorf("Error opening file")
	}
	defer csvFile.Close()

	var wg sync.WaitGroup

	var employees []models.Employee

	lastEmp := new(models.Employee)

	reader.Read()

	for {
		line, err := reader.Read()

		if err == io.EOF {
			break
		} else if err != nil {
			fmt.Println(err)
			return fmt.Errorf("Error loading csv")
		}
		name := line[0]
		name = strings.Replace(name, "'", " ", -1)
		employee := new(models.Employee)
		employee.Name = name
		salaryString := strings.Replace(line[3], ",", ".", -1)
		salary, err := strconv.ParseFloat(salaryString, 64)
		if err != nil {
			salary = 0
		}
		employee.Salary = salary

		if employee.Name == lastEmp.Name {
			if employee.Salary > lastEmp.Salary {
				lastEmp = employee
				employees[len(employees)-1].Salary = employee.Salary
			}
		} else {
			employees = append(employees, *employee)
			lastEmp = employee
		}

		if len(employees) >= 100000 {
			routineEmp := employees
			employees = nil

			go func() {
				wg.Add(1)
				checkEmployees(routineEmp, db)
				defer wg.Done()

			}()
		}
	}
	go func() {
		wg.Add(1)
		checkEmployees(employees, db)
		defer wg.Done()

	}()
	fmt.Println("waiting for table insertions")

	wg.Wait()
	return nil
}

func checkEmployees(employees []models.Employee, db *sql.DB) {

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
		log.Println(err)
	}
}
