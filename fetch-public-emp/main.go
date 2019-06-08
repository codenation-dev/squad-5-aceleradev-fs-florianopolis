package fetchpublicemp

import "fmt"

//Fetch download and save public employees to db
func Fetch() {
	var err error
	fmt.Println("Starting file download")
	err = downloadSpEmployees()
	if err != nil {
		fmt.Println("Error downloading file")
		panic(err)
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS publicEmployees (name text not null, salary float8 default 0);")
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
