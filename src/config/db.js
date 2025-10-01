import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
});

connection.connect(err => {
    if (err) console.error('Erreur de connexion à MySQL:', err);
    else console.log('Connecté à MySQL !');
});

export default connection;
