const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog_db_2",
  port: 3306,
});

const conn = db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connected Successfully!");
  }
});

module.exports = db;
