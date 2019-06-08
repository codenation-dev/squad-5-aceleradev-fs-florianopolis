package main

import (
	"codenation/banco-uati-presencial/aux"
	"fmt"
	"strings"
)

func main() {
	aux.DownloadSpEmployees() //Not working

	files, err := aux.Unzip("Remuneracao.zip", "output-folder")
	if err != nil {
		//log.Fatal(err)
	}
	fmt.Println("Unzipped:\n" + strings.Join(files, "\n"))
}

func ParseClientsCSV() {
	fmt.Println("Not implemented. Rename if needed")
}
