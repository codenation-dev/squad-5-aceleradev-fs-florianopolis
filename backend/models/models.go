package models

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type JWT struct {
	Token string `json:"token"`
}

type Error struct {
	Message string `json:"message"`
}

type Client struct {
	Name   string  `json:"name"`
	Salary float64 `json:"salary"`
}

//Employee holds an public employee name and salary
type Employee struct {
	Name   string
	Salary float64
}
