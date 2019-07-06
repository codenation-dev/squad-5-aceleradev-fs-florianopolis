package fetchpublicemp

import (
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
	"sync"
)

//Employee holds an public employee name and salary
type Employee struct {
	Name   string
	Salary float64
}

func getEmployeesFromCSV() error {
	csvFile, err := os.Open("data/remuneracao.csv")
	reader := csv.NewReader(csvFile)
	reader.Comma = ';'
	if err != nil {
		return fmt.Errorf("Error opening file")
	}
	defer csvFile.Close()

	var wg sync.WaitGroup

	var employees []Employee

	lastEmp := new(Employee)

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
		employee := new(Employee)
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
				checkEmployees(routineEmp)
				defer wg.Done()

			}()
		}
	}
	go func() {
		wg.Add(1)
		checkEmployees(employees)
		defer wg.Done()

	}()
	fmt.Println("waiting for table insetions")

	wg.Wait()
	return nil
}
