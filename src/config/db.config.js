import * as mysql from 'mysql2/promise'
// connection database
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


// promise
connection
    .connect()
    .then(() => console.log(`Connexion établie avec MySQL`))
    .catch(err => console.log(err));

export default connection;