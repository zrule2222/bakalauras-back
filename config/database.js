import mysql from "mysql2";

//create the connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "67%6ZF9CJ3IldcW0tTj2bVE",
  //password: "",
  database: "bakalauras",
});

export default db;