const mysql = require('mysql');
const {MYSQL_HOST,MYQSL_USER,MYSQL_PASSWORD,MYSQL_DB_NAME} = require('./config');

module.exports = {
    connection: mysql.createConnection({
                    host: MYSQL_HOST,
                    user: MYQSL_USER,
                    password: MYSQL_PASSWORD,
                    database: MYSQL_DB_NAME
                })
}
