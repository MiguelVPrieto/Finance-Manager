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



db.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
