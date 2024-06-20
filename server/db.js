// db.js

const mysql = require("mysql2");
const dbConfig = require("./config/db.config");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// Open MySQL connection
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    return;
  }
  console.log("Connected to MySQL database.");
});

module.exports = connection;
