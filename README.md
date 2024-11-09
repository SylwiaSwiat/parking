# ParkingApp

## Install RavenDB
- download [database](https://ravendb.net/download) and install RavenDB
- run database script based on system
- cofigure as unprotected
- go to [dashboard](http://127.0.0.1:8080/studio/index.html#databases) and create `ParkingApp` database


## Install Backend
- go to backend directory `cd backend`
- copy `.env.example` file into `.env` and fill with api key value
- install dependencies `npm ci`
- run project via `npm start`


## Install Frontend
- go to frontend directory `cd frontend`
- install dependencies `npm ci`
- run project via `npm run dev`