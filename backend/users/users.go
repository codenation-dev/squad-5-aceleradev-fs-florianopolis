package users

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"uati-api/database"
	"uati-api/models"
	"uati-api/utils"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var db = database.GetDB()

func Signup(w http.ResponseWriter, r *http.Request) {
	var error models.Error
	user := new(models.User)

	json.NewDecoder(r.Body).Decode(user)
	if user.Name == "" {
		error.Message = "Name is missing"
		utils.RespondWithError(w, http.StatusBadRequest, error)
		return
	}
	if user.Email == "" {
		error.Message = "Email is missing"
		utils.RespondWithError(w, http.StatusBadRequest, error)
		return
	}
	if user.Password == "" {
		error.Message = "Password is missing"
		utils.RespondWithError(w, http.StatusBadRequest, error)
		return
	}

	id, err := database.CreateUser(*user)

	if err != nil {
		error.Message = "Server Error"
		utils.RespondWithError(w, http.StatusInternalServerError, error)
		return
	}
	user.ID = id
	user.Password = ""

	w.Header().Set("Content-Type", "application/json")
	utils.ResponseJSON(w, user)

}

func Login(w http.ResponseWriter, r *http.Request) {
	user := new(models.User)
	var jwt models.JWT
	var error models.Error

	json.NewDecoder(r.Body).Decode(&user)

	if user.Email == "" {
		error.Message = "Email is missing"
		utils.RespondWithError(w, http.StatusBadRequest, error)
		return
	}
	if user.Password == "" {
		error.Message = "Password is missing"
		utils.RespondWithError(w, http.StatusBadRequest, error)
		return
	}

	password := user.Password

	row := db.QueryRow("SELECT * FROM users where email=$1", user.Email)
	err := row.Scan(&user.ID, &user.Email, &user.Name, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			error.Message = "The user does not exists"
			utils.RespondWithError(w, http.StatusBadRequest, error)
			return
		} else {
			log.Fatal(err)
		}
	}

	hashedPassword := user.Password

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))

	if err != nil {
		error.Message = "Invalid Password"
		utils.RespondWithError(w, http.StatusBadRequest, error)
		return
	}

	jwt.Token, err = GenerateToken(user)
	jwt.Name = user.Name

	if err != nil {
		log.Fatal(err)
	}

	w.WriteHeader(http.StatusOK)
	utils.ResponseJSON(w, jwt)
}

func GenerateToken(user *models.User) (string, error) {
	var err error

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": user.Email,
		"iss":   "uati-app",
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("Select id,name,email FROM users;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	users := new(models.UsersResponse)

	for rows.Next() {
		u := new(models.User)

		rows.Scan(&u.ID, &u.Name, &u.Email)

		users.Users = append(users.Users, *u)
	}
	response, err := json.Marshal(users)
	if err != nil {
		log.Fatal(err)
	}

	w.Write(response)
}
