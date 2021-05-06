require("dotenv").config();

const mysql = require("mysql2/promise");
let status = false;

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  NODE_ENV,
} = process.env;

if (NODE_ENV === "development") {
  status = true;
}

let pool;

async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 30,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: "Z",
      multipleStatements: status,
    });
  }

  return await pool.getConnection();
}

module.exports = getDB;
