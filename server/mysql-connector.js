const mysql = require('mysql');
<<<<<<< HEAD
const {MYSQL_HOST,MYQSL_USER,MYSQL_PASSWORD,MYSQL_DB_NAME,MYSQL_NUM_CONNECTIONS} = require('./config');

module.exports = {
    connectionPool: mysql.createPool({
                    connectionLimit: MYSQL_NUM_CONNECTIONS,
=======
const {MYSQL_HOST,MYQSL_USER,MYSQL_PASSWORD,MYSQL_DB_NAME} = require('./config');

module.exports = {
    connection: mysql.createConnection({
>>>>>>> parent of 4936d5c... Revert "Adding psych sheet backend"
                    host: MYSQL_HOST,
                    user: MYQSL_USER,
                    password: MYSQL_PASSWORD,
                    database: MYSQL_DB_NAME
                })
}
