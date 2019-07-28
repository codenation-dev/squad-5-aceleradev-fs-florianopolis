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
//	"uati-api/email"
	"uati-api/models"
	"uati-api/utils"
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

	var queryString string
	queryString = fmt.Sprintf("INSERT INTO alerts2 (client) VALUES (TRUE) RETURNING id;")
	var idAlert int
	err := db.QueryRow(queryString).Scan(&idAlert)
	if err != nil {
			 log.Fatalln(err)
	}

	for _, email := range emails {
			queryString = "INSERT INTO alerts_responsavel (id_user, id_alert) VALUES ((SELECT id FROM users2 WHERE email = $1), $2)"
			 _ = db.QueryRow(queryString, email, idAlert)
	}

	// err := email.Send(emails, "Um de seus clientes se tornou um funcionario publico", getClientsMessage(client))

	// if err != nil {
	// 		fmt.Println("Error sendign clients email", err)
	// 		return
	// }

	for _, client := range clients {
		var queryString string
		queryString = "INSERT INTO alerts_client (id_person, id_alert) VALUES ((SELECT id FROM publicemployees2 WHERE name = $1), $2);"
		db.QueryRow(queryString, client.Name, idAlert)
		fmt.Println(client.Name)

		queryString = "UPDATE specials SET  alertsent=true WHERE name = $1;"
		db.QueryRow(queryString, client.Name)
	}
}

func sendNonClientsEmails(total int, specials []models.Special, emails []string) {

	var queryString string
	queryString = fmt.Sprintf("INSERT INTO alerts2 (client) VALUES (FALSE) RETURNING id;")
	var idAlert int
	err := db.QueryRow(queryString).Scan(&idAlert)
	if err != nil {
			 log.Fatalln(err)
	}

	for _, email := range emails {
			queryString = "INSERT INTO alerts_responsavel (id_user, id_alert) VALUES ((SELECT id FROM users2 WHERE email = $1), $2)"
			 _ = db.QueryRow(queryString, email, idAlert)
	}

	// err := email.Send(emails, "novos funcionarios publicos de interesse", getSpecialsMessage(total, specialsNames))

	// if err != nil {
	// 	fmt.Println("Error sendign employees email", err)
	// 	return
	// }

	for _, special := range specials {
		queryString = "INSERT INTO alerts_client (id_person, id_alert) VALUES ((SELECT id FROM publicemployees2 WHERE name = $1), $2);"
		db.QueryRow(queryString, special.Name, idAlert)
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
	var error models.Error
	user := new(models.User)
	json.NewDecoder(r.Body).Decode(&user)

	if user.Email == "" {
		error.Message = "Email is missing"
		utils.RespondWithError(w, http.StatusBadRequest, error)
		return
	}
	rows, err := db.Query("Select alerts2.id, TO_CHAR(sent_at,'dd/mm/yyyy HH:ss') as sent_at FROM alerts2 where exists(select ar.id from alerts_responsavel ar where ar.id_alert = alerts2.id and id_user = (select id from users2 where email = $1))", user.Email)
fmt.Println("Select alerts2.id, TO_CHAR(sent_at,'dd/mm/yyyy HH:ss') as sent_at FROM alerts2 where exists(select ar.id from alerts_responsavel ar where ar.id_alert = alerts2.id and id_user = (select id from users2 where email = $1))")
fmt.Println(user.Email)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	alerts := new(models.AlertsResponse2)
	for rows.Next() {
		a := new(models.Alert2)

		rows.Scan(&a.ID, &a.SentAt)

		rowPublic, err := db.Query("select pe.name, pe.salary from alerts_client ac left join publicemployees2 pe on (pe.id = ac.id) where ac.id_alert = $1", a.ID)

		if err != nil {
			log.Fatal(err)
		}
		defer rowPublic.Close()
		for rowPublic.Next() {
			e := new(models.Employee)
			rowPublic.Scan(&e.Name, &e.Salary)
			a.Employees = append(a.Employees, *e)

		}
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
