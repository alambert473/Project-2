const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db/connection');

// Register a new client
router.get('/register', async (req, res) => {
  const { first_name, last_name, address, credit_card_info, phone_number, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO clients (first_name, last_name, address, credit_card_info, phone_number, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, address, credit_card_info, phone_number, email, hashedPassword]
    );
    res.status(201).json({ client_id: result.insertId });
  } catch (err) {
    console.error('Error registering client:', err);
    res.status(500).json({ error: 'Failed to register client.' });
  }
});

// Login a client
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM clients WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const client = rows[0];
    const isPasswordValid = await bcrypt.compare(password, client.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    res.status(200).json({
      message: 'Login successful',
      client: { id: client.client_id, email: client.email, first_name: client.first_name },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Failed to log in.' });
  }
});

module.exports = router;