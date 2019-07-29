# Gestão de clientes Banco Uati

## Objetivo

O objetivo deste produto é monitorar e gerar alertas da captura de uma determinada fonte com base em uma determinada base do cliente e regra pré estabelecida.

## Contextualização

O Banco Uati gostaria de monitorar de forma contínua e automatizada caso um de seus clientes vire um funcionário público do estado de SP (http://www.transparencia.sp.gov.br/busca-agentes.html) ou seja um bom cliente com um salário maior que 20 mil reais.

A lista de clientes do banco Uati encontra-se no arquivo `clientes.csv` contido neste projeto.

# Como funciona

A cada 24h o backend do serviço irá baixar e inserir uma lista de funcionários públicos de São Paulo na base de dados. Neste processo, irá enviar notificações por email para usuários da plataforma com clientes em potencial.  
Pela plataforma em React, é possível conferir dados estatísticos sobre o serviço, bem como adicionar novos usuários, atualizar a lista de clientes do banco e acompanhar as notificações do sistema.  

# Como usar

## Backend

O backend do projeto está sendo servido em um Amazon Web Service:  
http://ec2-18-223-122-18.us-east-2.compute.amazonaws.com:8080  

O servidor também pode ser subido atrás vezes dos comandos na pasta "backend"  
`docker build . -t uati-api`  
`docker-compose up`  
E então disponível no http://localhost:8080/api/  

### Endpoints  

Os endpoints estão documentados pelo SwaggerUI disponível em:  
http://ec2-18-223-122-18.us-east-2.compute.amazonaws.com:8080/api/  

## Frontend  

O frontend do projeto pode ser acessado pelo `yarn start` na pasta `frontend/uatiproject`  
O login padrão é **squad5codenation@gmail.com** com senha **1234**  
