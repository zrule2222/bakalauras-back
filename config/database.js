import mysql from "mysql2";

//create the connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "67%6ZF9CJ3IldcW0tTj2bVE",
  database: "bakalauras",
});

export default db;