const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Submit a request for quote
router.post('/', async (req, res) => {
  const { client_id, property_address, square_feet, proposed_price, images, note } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO RequestForQuotes (client_id, property_address, square_feet, proposed_price, images, note) VALUES (?, ?, ?, ?, ?, ?)',
      [client_id, property_address, square_feet, proposed_price, JSON.stringify(images), note]
    );
    res.status(201).json({ request_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get all requests
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM RequestForQuotes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;