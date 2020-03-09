const mysql = require('mysql');
const {MYSQL_HOST,MYQSL_USER,MYSQL_PASSWORD,MYSQL_DB_NAME,MYSQL_NUM_CONNECTIONS} = require('./config');

module.exports = {
    connectionPool: mysql.createPool({
                    connectionLimit: MYSQL_NUM_CONNECTIONS,
                    host: MYSQL_HOST,
                    user: MYQSL_USER,
                    password: MYSQL_PASSWORD,
                    database: MYSQL_DB_NAME
                })
}
