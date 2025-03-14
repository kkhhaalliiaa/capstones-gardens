require('dotenv').config(); 
const mysql = require('mysql2');

console.log('Connecting to DB:', process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = connection;
