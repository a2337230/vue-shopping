const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'local',
  user: 'root',
  password: 'root',
  database: 'fanhuijie'
})
conn.connect();

module.exports = conn;
