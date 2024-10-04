<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h4 align="center"> 
	 Transdata API 🚗📊
</h4>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/leozeracode/transdata-api?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/leozeracode/transdata-api">
	
  <a href="https://www.linkedin.com/in/leonardo-rviana/">
    <img alt="Made by Leonardo Viana" src="https://img.shields.io/badge/made%20by-LeonardoViana-%2304D361">
  </a>

  <a href="https://github.com/leozeracode/transdata-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/leozeracode/transdata-api">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/leozeracode/transdata-api/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/leozeracode/transdata-api?style=social">
  </a>
</p>

## Description

The Transdata API is a service developed using NestJS with the purpose of providing a GraphQL interface to access vehicle data from an external API (National Highway Traffic Safety Administration - NHTSA). The API allows querying, transforming, and storing manufacturer and vehicle type data in a MongoDB database for later retrieval through a single GraphQL endpoint.

The project is set up to be easily run in a Dockerized environment, with support for data migration and seeding operations. Additionally, a cron job has been implemented to ensure that the information is updated periodically.

## Clone the Repository

```bash
$ git clone https://github.com/seu-usuario/transdata-api.git
$ cd transdata-api
```

## Configure the Environment
Create a .env file in the root directory of the project with the following variables:

```
MONGO_URL=mongodb://mongo:27017/portal-test?retryWrites=true&w=majority&appName=transdata
VEHICLE_DATA_QUANTITY=1
NODE_ENV=development
```

## Run the Environment with Docker
```bash
$ docker-compose up --build
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Access the GraphQL Endpoint
```
query {
  vehicles {
    id
    makeId
    makeName
    vehicleTypes {
      typeId
      typeName
    }
  }
}
```

## Project Structure
The project follows a clean and modular architecture:

```
transdata-api/
│
├── Dockerfile               # Configuration file to create the Docker image for the API
├── docker-compose.yml       # Docker Compose configuration to run both the API and MongoDB
├── src/                     # Project source code
│   ├── app.module.ts        # Main module of the NestJS application
│   ├── main/                # Application entry point and configuration
│   ├── infra/               # Infrastructure layer, including database configurations and external API integrations
│   ├── domain/              # Domain layer, containing business logic entities and interfaces
│   ├── service/             # Service layer, implementing use cases and business rules
│   └── ...                  # Other files and directories
├── tests/                   # End-to-End (E2E) and unit tests
│   └── vehicle-data-graphql.e2e.spec.ts # Integration tests for the GraphQL endpoint
└── ...
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```