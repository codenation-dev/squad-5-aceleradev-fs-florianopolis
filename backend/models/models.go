package models

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password,omitempty"`
	Super    bool   `json:"super_user"`
}

type UsersResponse struct {
	Users []User `json:"users"`
}

type JWT struct {
	Token string `json:"token"`
	Name  string `json:"name"`
	Super bool   `json:"super_user"`
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

type GraphicsInfo struct {
	AvgClientsSalary        float64 `json:"avgClientsSalary"`
	AvgSpecialsSalary       float64 `json:"avgSpecialsSalary"`
	AvgSpecialClientsSalary float64 `json:"avgSpecialClientsSalary"`
	OverClientsAvgSpecials  int     `json:"OverClientsAvgSpecials"`
}

type SalariesPie struct {
	Sub5   int `json:"sub5"`
	Sub10  int `json:"sub10"`
	Sub15  int `json:"sub15"`
	Sub20  int `json:"sub20"`
	Over20 int `json:"over20"`
}

type ResponseDbInfo struct {
	ClientsSalary SalariesPie  `json:"clientsSalary"`
	AvgSalaries   GraphicsInfo `json:"avgSalaries"`
}
