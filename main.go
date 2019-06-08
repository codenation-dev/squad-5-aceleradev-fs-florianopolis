package main

import (
	"fmt"
	"strings"

	"github.com/codenation.dev/squad-5-aceleradev-fs-florianopolis/aux"
)

func main() {
	aux.DownloadSpEmployees() //Not working

	files, err := aux.Unzip("Remuneracao.zip", "output-folder")
	if err != nil {
		//log.Fatal(err)
	}
	fmt.Println("Unzipped:\n" + strings.Join(files, "\n"))
}

//ParseClientsCSV not implemeted
func ParseClientsCSV() {
	fmt.Println("Not implemented. Rename if needed")
}
