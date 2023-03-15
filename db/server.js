const mysql = require('mysql2');

require ('dotenv').config();

const server = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: 'employees'
});

module.exports = server;