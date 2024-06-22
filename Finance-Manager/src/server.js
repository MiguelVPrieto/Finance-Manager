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

  // Query to get the current highest idusers value
  const getMaxIdQuery = 'SELECT MAX(idusers) AS max_id FROM users';
  db.query(getMaxIdQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    const prev_id = results[0].max_id || 0;
    const new_id = prev_id + 1;

    // Insert the new user with the incremented idusers
    const insertQuery = 'INSERT INTO users (idusers, user_name, user_email, user_password) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [new_id, firstName, email, password], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('User added successfully');
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
