const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'webstormuser', // replace with your MySQL username
  password: 'webstorm@123', // replace with your MySQL password
  database: 'finance_managerdatabase'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Create a route to handle form submissions
app.post('/submit-form', (req, res) => {
  const { firstName, email, password } = req.body;
  const sql = 'INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [firstName, email, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('User added successfully');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
