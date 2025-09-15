const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// API endpoint to get all messages
app.get('/messages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving messages');
  }
});

// API endpoint to post a new message
app.post('/messages', async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).send('Name and message are required.');
    }
    await pool.query('INSERT INTO messages (name, message) VALUES (?, ?)', [name, message]);
    res.status(201).send('Message added!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding message');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});