# StoreFront API

## Table of contents
- [StoreFront API](#storefront-api)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Database Configurations](#database-configurations)
  - [Server Configurations](#server-configurations)
  - [Scripts](#scripts)

---

## Installation
- After cloning the repo open the folder in the terminal and run the following command to install all packages
```
npm i
```
- Rename `.env.example` to `.env`

---

## Database Configurations
- Open psql terminal.
- Create user
```sql
CREATE USER fwd WITH PASSWORD 'fwd' SUPERUSER;
```
- Create A Database
```sql
CREATE DATABASE store OWNER fwd ENCODING UTF8;
```
- Crate testing database
```sql
CREATE DATABASE store_test OWNER fwd ENCODING UTF8;
```
- The database is running on host `localhost` and port `5432`

---

## Server Configurations
- The server is running on port `3000`
- Bcrypt paper is `secret` and rounds = `8`
- JWT secret = `JWTSECRET`

---

## Scripts
- Build the project from `TypeScript` to `JavaScript` and save it to `/build`
```
npm run build
```

- Starting the final build of the project
```
npm run start
```

- Running the `TypeScript` server in development with `nodemon`
```
npm run dev
```

- Getting linting errors using `eslint`
```
npm run lint
```

- Fixing linting errors using `eslint`
```
npm run lint:fix
```

- Formatting the project using `prettier`
```
npm run format
```

- Run migrations of the database
```
npm run db:up
```

- Reset the database
```
npm run db:down
```

- Building the project and testing the scripts
```
npm run test
```

  