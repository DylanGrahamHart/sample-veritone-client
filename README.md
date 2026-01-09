
## Prerequisites
You must have docker installed locally

## Description

1) Client project builds the react application bundle, and exports it to the backend from where it is served
2) Server hosts the express service which connects to the PostgreSQL instance running in a docker container
3) Docker PostgreSQL image is pulled and runs in the background 



# Clean Install
- `git clone "https://github.com/DylanGrahamHart/sample-veritone-client"`
- `git clone "https://github.com/DylanGrahamHart/sample-veritone-server"`

# Frontend build
- `cd sample-veritone-client`
- `npm install`
- `npm run build`

# Database
- `docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -v postgres-data:/var/lib/postgresql -p 5432:5432 -d postgres`


# Server
- `cd ../sample-veritone-server`
- `npm install`
- `npm run start`

