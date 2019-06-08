package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/codenation-dev/squad-5-aceleradev-fs-florianopolis/aux"
)

func main() {
	aux.DownloadSpEmployees() //Not working

	files, err := aux.Unzip("Remuneracao.zip", "output-folder")
	if err != nil {
		//log.Fatal(err)
	}
	fmt.Println("Unzipped:\n" + strings.Join(files, "\n"))

	OpenCSV("remuneracao_demo.txt")
}

//ParseClientsCSV not implemeted
func ParseClientsCSV() {
	fmt.Println("Not implemented. Rename if needed")
}

type employee struct {
	Name string
	Job  string
	Wage float64
}

// OpenCSV opens CSV data and stores it in a variable
func OpenCSV(path string) {
	csvFile, _ := os.Open(path)
	reader := csv.NewReader(bufio.NewReader(csvFile))
	var people []employee
	for {
		reader.Read()
		line, error := reader.Read()
		fmt.Println(line)

		if error == io.EOF {
			break
		} else if error != nil {
			log.Fatal(error)
		}

		wageVar, _ := strconv.ParseFloat(line[3], 64)
		people = append(people, employee{
			Name: line[0],
			Job:  line[1],
			Wage: wageVar,
		})
	}
	fmt.Println(people)
	return
}
