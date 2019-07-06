package fetchpublicemp

import "fmt"

//Fetch download and save public employees to db
func Fetch() {
	var err error
	err = downloadSpEmployees()
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

	err = getEmployeesFromCSV()
	if err != nil {
		fmt.Println("Error parsing data")
		panic(err)
	}
	fmt.Println("done")

}
