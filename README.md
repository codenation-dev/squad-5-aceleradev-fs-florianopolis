#EXECUTANDO

- rodar o postgres na porta 5432 - caso queira usar o docker para o db, execute: `docker run --name mydb -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`
  -para rodar a primeira vez e baixar e fazer a tabela de funcionarios publicos execute: `go run main.go -setdb`
  -para apenas rodar o servidor execute: `go run main.go`
