require('dotenv').config(); 
const mysql = require('mysql2');

console.log('Connecting to DB:', process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME);

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.getConnection((error, connection) => {

    if(error){
      process.exit(1);
    };
    connection.release();
  });

module.exports = connection;
