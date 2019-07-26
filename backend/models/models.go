package models

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password,omitempty"`
}

type UsersResponse struct {
	Users []User `json:"users"`
}

type JWT struct {
	Token string `json:"token"`
	Name  string `json:"name"`
}

type Error struct {
	Message string `json:"message"`
}

type Client struct {
	Name string `json:"name"`
}

type ClientsResponse struct {
	Clients []Client `json:"clients`
}

//Employee holds an public employee name and salary
type Employee struct {
	Name   string
	Salary float64
}

type Special struct {
	Name      string  `json:"name"`
	Salary    float64 `json:"salary"`
	IsClient  bool    `json:"isClient"`
	AlertSent bool    `json:"alertSent"`
}

type SpecialsResponse struct {
	Specials []Special `json:"specials"`
}

type SuccessResponse struct {
	Message string `json:"message"`
}

type Alert struct {
	SentTo   string `json:"sentTo"`
	IsClient bool   `json:"isClientEmail"`
	About    string `json:"name"`
	SentAt   string `json:"sentAt"`
}

type AlertsResponse struct {
	Alerts []Alert `json:"alerts"`
}
