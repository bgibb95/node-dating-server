# node-dating-server

A Node.js REST API for user dating profiles using:

- JWT
- MySQL
- Express
- Sequelize (ORM)
- TypeScript

## Running locally

Ensure Node.js and MySQL server are installed and running on your system.

### Set environment variables

Create a `.env` file in the root directory containing the required environment variables e.g.

```.env
PORT=8000
JWT_PRIVATE_KEY=MIIBPQIBAAJBAJZnqyn
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=12345678*
DB_NAME=testdb
ALLOWED_ORIGIN=http://localhost:3000
```

### Initialise the database

Uncomment the `db.sequelize.sync` function in `index.ts`.

### Run the node server

- Run `npm i`.
- Run `npm run dev`.
