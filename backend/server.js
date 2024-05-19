const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = 3100;

app.use(bodyParser.json());
app.use(cors()); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'user1',
  password: 'Drishti@123',
  database: 'handleCMS'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.post('/create-entity', (req, res) => {
  const { entityName, attributes } = req.body;

  let columns = attributes.map(attr => {
    return `${attr.name} ${attr.type.toUpperCase()}`;
  }).join(', ');

  const sql = `CREATE TABLE ${entityName} (id INT AUTO_INCREMENT PRIMARY KEY, ${columns})`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(`Table ${entityName} created successfully.`);
  });
});

app.post('/:entity', (req, res) => {
  const entity = req.params.entity;
  const data = req.body;

  const columns = Object.keys(data).join(', ');
  const values = Object.values(data).map(val => `'${val}'`).join(', ');

  const sql = `INSERT INTO ${entity} (${columns}) VALUES (${values})`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Entry created successfully.');
  });
});

app.get('/', (req, res) => {
  console.log("first");
  res.send("Server is running");
});

app.get('/:entity', (req, res) => {
  const entity = req.params.entity;

  const sql = `SELECT * FROM ${entity}`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.put('/:entity/:id', (req, res) => {
  const entity = req.params.entity;
  const id = req.params.id;
  const data = req.body;

  const updates = Object.keys(data).map(key => `${key}='${data[key]}'`).join(', ');

  const sql = `UPDATE ${entity} SET ${updates} WHERE id=${id}`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Entry updated successfully.');
  });
});

app.delete('/:entity/:id', (req, res) => {
  const entity = req.params.entity;
  const id = req.params.id;

  const sql = `DELETE FROM ${entity} WHERE id=${id}`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Entry deleted successfully.');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
