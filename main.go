package main

import (
	"fmt"
	"strings"
)

func main() {
	DownloadSpEmployees() //Not working


	files, err := Unzip("Remuneracao.zip", "output-folder")
    if err != nil {
        //log.Fatal(err)
    }
    fmt.Println("Unzipped:\n" + strings.Join(files, "\n"))
}

func ParseClientsCSV() {
	fmt.Println("Not implemented. Rename if needed")
}