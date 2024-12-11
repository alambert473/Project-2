const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const router = express.Router();
const db = require('../db/connection');

// Register a new client
router.post('/register', async (req, res) => {
  const { first_name, last_name, address, credit_card_info, phone_number, email, password } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      'INSERT INTO Clients (first_name, last_name, address, credit_card_info, phone_number, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, address, credit_card_info, phone_number, email, hashedPassword]
    );
    res.status(201).json({ client_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get all clients
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Clients');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;