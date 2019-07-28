package alerts

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"uati-api/database"
	"uati-api/email"
	"uati-api/models"
)

var db = database.GetDB()

func SendAlerts() {
	var newSpecials int
	var nonClientSpecials []models.Special
	var specialClients []models.Special
	var emails []string

	var wg sync.WaitGroup
	fmt.Println("Geting alerts information.")

	wg.Add(4)
	go func() {
		var err error
		newSpecials, err = newSpecialsCount()
		if err != nil {
			log.Fatal(err)
		}
		wg.Done()
	}()

	go func() {
		var err error
		nonClientSpecials, err = getTopNewSpecials()
		if err != nil {
			log.Fatal(err)
		}
		wg.Done()
	}()

	go func() {
		var err error
		specialClients, err = getNewSpecialsClients()
		if err != nil {
			log.Fatal(err)
		}
		wg.Done()
	}()

	go func() {
		var err error
		emails, err = getUsersEmails()
		if err != nil {
			log.Fatal(err)
		}
		wg.Done()
	}()

	wg.Wait()

	fmt.Println("Sendig alerts...")

	go sendClientsEmails(specialClients, emails)
	go sendNonClientsEmails(newSpecials, nonClientSpecials, emails)

}

func sendClientsEmails(clients []models.Special, emails []string) {
	for _, client := range clients {
		var queryString string

		emailValues := []string{}

		for _, email := range emails {

			value := fmt.Sprintf("('%s',TRUE,'%s')", email, client.Name)

			emailValues = append(emailValues, value)

		}

		err := email.Send(emails, "Um de seus clientes se tornou um funcionario publico", getClientsMessage(client))

		if err != nil {
			fmt.Println("Error sendign clients email", err)
			return
		}
		stringValues := strings.Join(emailValues[:], ",\n")
		queryString = fmt.Sprintf("INSERT INTO alerts (sent_to, client, name) VALUES  %s;", stringValues)

		_, err = db.Exec(queryString)
		if err != nil {
			log.Fatalln(err)
		}

		queryString = fmt.Sprintf("UPDATE specials SET  alertsent=true WHERE name='%s';",
			client.Name)

		_, err = db.Exec(queryString)
		if err != nil {
			log.Fatal(err)
		}

	}
}

func sendNonClientsEmails(total int, specials []models.Special, emails []string) {
	if total == 0 {
		return
	}
	var queryString string
	var specialsNames string

	for index, special := range specials {
		specialsNames += special.Name

		if index != len(specials)-1 {
			specialsNames += ","
		}
	}

	emailValues := []string{}
	for _, email := range emails {

		value := fmt.Sprintf("('%s', '%s')", email, specialsNames)

		emailValues = append(emailValues, value)

	}

	fmt.Println("outside email emp")
	err := email.Send(emails, "novos funcionarios publicos de interesse", getSpecialsMessage(total, specialsNames))

	if err != nil {
		fmt.Println("Error sendign employees email", err)
		return
	}

	stringValues := strings.Join(emailValues[:], ",\n")
	queryString = fmt.Sprintf("INSERT INTO alerts (sent_to, name) VALUES  %s;", stringValues)

	_, err = db.Exec(queryString)

	if err != nil {
		log.Println(err)
	}
	_, err = db.Exec("UPDATE specials SET alertsent=true WHERE isclient IS NOT TRUE;")
	if err != nil {
		log.Println(err)
	}
}

func newSpecialsCount() (int, error) {
	var count int
	row := db.QueryRow("SELECT count(name) FROM specials WHERE alertSent=false AND isclient IS NOT TRUE;")
	err := row.Scan(&count)
	if err != nil {
		return 0, err
	}

	return count, nil
}

func getTopNewSpecials() ([]models.Special, error) {
	var specials []models.Special
	rows, err := db.Query("SELECT * FROM specials WHERE isClient IS NOT TRUE AND alertSent=false ORDER BY salary DESC LIMIT  10;")
	if err != nil {
		return specials, err
	}
	defer rows.Close()

	for rows.Next() {
		s := new(models.Special)

		rows.Scan(&s.Name, &s.Salary, &s.IsClient, &s.AlertSent)

		specials = append(specials, *s)
	}

	return specials, nil
}

func getNewSpecialsClients() ([]models.Special, error) {
	var specialClients []models.Special
	rows, err := db.Query("SELECT * FROM specials WHERE isClient IS TRUE AND alertSent=false;")
	if err != nil {
		return specialClients, err
	}
	defer rows.Close()

	for rows.Next() {
		s := new(models.Special)

		rows.Scan(&s.Name, &s.Salary, &s.IsClient, &s.AlertSent)

		specialClients = append(specialClients, *s)
	}

	return specialClients, nil
}

func getUsersEmails() ([]string, error) {

	var emails []string
	rows, err := db.Query("SELECT email FROM users;")
	if err != nil {
		return emails, err
	}
	defer rows.Close()

	for rows.Next() {
		var email string

		rows.Scan(&email)

		emails = append(emails, email)
	}

	return emails, nil
}

func GetAlerts(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("Select sent_to,client,name, TO_CHAR(sent_at,'dd/mm/yyyy')as sent_at FROM alerts ORDER BY sent_at DESC;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	alerts := new(models.AlertsResponse)

	for rows.Next() {
		a := new(models.Alert)

		rows.Scan(&a.SentTo, &a.IsClient, &a.About, &a.SentAt)

		alerts.Alerts = append(alerts.Alerts, *a)
	}
	response, err := json.Marshal(alerts)
	if err != nil {
		log.Fatal(err)
	}

	w.Write(response)
}

func getClientsMessage(client models.Special) string {
	return fmt.Sprintf("Seu Cliente, %s,se tornou um funcionario publico, com um salario de R$ %s", client.Name, strconv.FormatFloat(client.Salary, 'f', -1, 64))
}

func getSpecialsMessage(total int, names string) string {
	message := fmt.Sprintf("Encotramos um total de %d possiveis pessoas de interesse, entre elas:\n", total)
	namesSlice := strings.Split(names, ",")
	for _, name := range namesSlice {
		message += fmt.Sprintln("%s\n", name)
	}

	return message
}
