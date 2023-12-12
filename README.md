<h1 align = "center"> APost</h1>
<div align = "center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fjust-apost.web.app%2F)
</div>
<p align = "center">Yet Another Postal service Web app. Simple parcel management, check, send, and receive parcels without any problems  </p>
<p align = "center">
  <a href="#how-it-works">How it works</a> •
  <a href="#prerequisites">Prerequisites</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#technologies">Technologies</a> •
  <a href="#app-architecture">App Architecture</a> •
  <a href="#db-structure">DB Structure</a> •
  <a href="#contributing">Contributing</a>
</p>



### Features:
-  User authorization and authentication (JWT)
-  User account creation, deactivation, and management
-  Responsive design
-  General Parcels view
-  Parcel Details view
-  Parcel sorting (by type)
-  In app notifications
-  Email notifications
-  Driver app
-  Locker machine app
-  Parcel generator robot 

## Technologies
- Java (spring boot)
- PostgreSQL
- Typescript
- ReactJS
- CSS



## Prerequisites
- Node.js 
- Java
- Spring boot
- PostgresSQL


## Installation
1. Clone the repo
```sh
git clone https://github.com/OAMK-VPN/APost.git
```
2. Install dependencies
```sh
windows: .\install.ps1
linux|macos: pwsh ./install.ps1
```
3. Update Endpoints in .env (if needed)
```sh
VITE_APP_USERS_BASEURL=
VITE_APP_PARCELS_BASEURL=
VITE_APP_NOTIFICATIONS_BASEURL=
```
4. Update properties in application.properties `(server/src/main/resources/)`


## Usage
1. Run the server
```sh
cd server
mvn spring-boot:run
```
2. Run the client
```sh
cd client/customer
cd client/driver
cd client/locker
npm run dev
```



## How it works
<div align = "center">

  ![How it works](images/How_itworks.svg)
</div>

## App architecture
![App architecture](images/App_architecture.svg)

## DB structure
![DB structure](images/DB_st.svg)


## Contributing
Contributions, issues and feature requests are welcome!

## License
This project is licensed under a [MIT license](https://opensource.org/licenses/MIT)
