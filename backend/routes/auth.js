const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Sign in a client
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Fetch the client with the given email
    const [rows] = await db.execute('SELECT * FROM clients WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const client = rows[0];

    // Compare the plain-text password (no bcrypt here for simplicity)
    if (password !== client.password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Respond with client details
    res.status(200).json({
      message: 'Login successful.',
      client: { id: client.client_id, email: client.email, first_name: client.first_name },
    });
  } catch (err) {
    console.error('Sign-in error:', err);
    res.status(500).json({ error: 'Failed to log in.' });
  }
});

module.exports = router;