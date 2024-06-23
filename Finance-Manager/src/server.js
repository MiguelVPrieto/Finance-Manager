const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

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

app.post('/create-account', (req, res) => {
  const { firstName, email, password } = req.body;
  const searchQuery = 'SELECT * FROM users WHERE user_email =?';

  db.query(searchQuery, [email], (err, result) => {
    if (err) {
      console.error('Error querying database', err);
      return res.status(500).send({ isUsed: true, message: 'Error querying database' });
    }

    if (!(result.length === 0)) {
      console.log('Email already used');
      return res.send({ isUsed: true, message: 'Email already used' });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).send({ isUsed: true, message: 'Error creating user' });
        }

        const insertQuery = 'INSERT INTO users (user_name, user_email, user_password) VALUES (?,?,?)';
        db.query(insertQuery, [firstName, email, hash], (err, result) => {
          if (err) {
            console.error('Error inserting user:', err.message);
            return res.status(500).send({ isUsed: true, message: 'Error creating user' });
          }
          console.log('User added successfully');
          res.send({ isUsed: false, message: 'User created successfully' });
        });
      });
    }
  })
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE user_email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send({ isValid: false });
    }

    if (result.length === 0) {
      return res.send({ isValid: false });
    }

    const user = result[0];
    bcrypt.compare(password, user.user_password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).send({ isValid: false });
      }

      if (isMatch) {
        res.send({ isValid: true });
      } else {
        res.send({ isValid: false });
      }
    });
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
