const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt'); // added for password hashing

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'webstormuser',
  password: 'webstorm@123',
  database: 'finance-managerdatabase'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('MySQL Connected...');
});

app.post('/submit-form', (req, res) => {
  const { firstName, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send('Error creating user');
    }

    const insertQuery = 'INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)';
    db.query(insertQuery, [firstName, email, hash], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err.message);
        return res.status(500).send('Error creating user');
      }
      console.log('User added successfully');
      res.send('User added successfully');
    });
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
