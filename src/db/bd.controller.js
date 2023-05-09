const mysql = require("mysql2");
const { promisify } = require("util");

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "base-datos-inmobi",
  port: 3306,
});

conn.getConnection((err, connection) => {
  if (err) {
    console.log("error", err);
    return;
  } else {
    console.log("conexion exitosa");
    connection.release();
  }
});
// convirtiendo callbacks a promesas
conn.query = promisify(conn.query);

module.exports = conn;
