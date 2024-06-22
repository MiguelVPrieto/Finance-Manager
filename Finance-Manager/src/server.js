const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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


  db.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
    } else {
      console.log('Database query successful:', results);
    }
  });
});

app.post('/submit-form', (req, res) => {
  const { firstName, email, password } = req.body;

  const getMaxIdQuery = 'SELECT MAX(idusers) AS max_id FROM users';
  db.query(getMaxIdQuery, (err, results) => {
    if (err) {
      console.error('Error getting max id:', err.message);
      return res.status(500).send('Error getting max id');
    }

    const prev_id = results[0].max_id || 0;
    const new_id = prev_id + 1;

    const insertQuery = 'INSERT INTO users (idusers, user_name, user_email, user_password) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [new_id, firstName, email, password], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err.message);
        return res.status(500).send('Error inserting user');
      }
      console.log('User added successfully');
      res.send('User added successfully');
    });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
