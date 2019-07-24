package email

import (
	"net/smtp"
	"os"
	"strings"
)

func Send(to []string, subject string, body string) error {
	from := os.Getenv("SERVICE_EMAIL")
	pw := os.Getenv("EMAIL_PW")

	msg := "From: " + from + "\n" +
		"To: " + strings.Join(to, ",") + "\n" +
		"Subject: " + subject + "\n\n" +
		body

	err := smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, pw, "smtp.gmail.com"),
		from, to, []byte(msg))

	if err != nil {
		return err
	}

	return nil
}
