const express = require("express");
const cors = require("cors");

const app = express();

const mysql = require("mysql");
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "authentication",
});
app.post("/signin", async (req, res) => {
  const sql = "INSERT INTO signin (username,email,password) VALUES (?,?,?)";
  values = [req.body.username, req.body.email, req.body.password];
  await db.query(sql, values);
  res.send("user registered successfully");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM signin WHERE username=? AND password=?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      res.status(500).send("Error while logging in");
    } else if (results.length > 0) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid username or password");
    }
  });
});
app.listen(8080, () => {
  console.log("Sever is running on the port 8080");
});
