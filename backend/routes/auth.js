const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt for password comparison
const router = express.Router();
const db = require('../db/connection');

// Sign in a client
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM Clients WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const client = rows[0];
    const passwordMatch = await bcrypt.compare(password, client.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    res.status(200).json({ 
      message: 'Login successful.', 
      client: { id: client.client_id, email: client.email, first_name: client.first_name }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log in.' });
  }
});

module.exports = router;