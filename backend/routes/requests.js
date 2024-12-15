const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Submit a new quote request
router.post('/', async (req, res) => {
  const { client_id, property_address, square_feet, proposed_price, images, note } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO requestforquotes (client_id, property_address, square_feet, proposed_price, images, note, status, created_at) VALUES (?, ?, ?, ?, ?, ?, "Pending", NOW())',
      [client_id, property_address, square_feet, proposed_price, JSON.stringify(images), note]
    );
    res.status(201).json({ request_id: result.insertId });
  } catch (err) {
    console.error('Error creating quote request:', err);
    res.status(500).json({ error: 'Failed to submit quote request.' });
  }
});

// Get all quote requests
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM requestforquotes');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching quote requests:', err);
    res.status(500).json({ error: 'Failed to fetch quote requests.' });
  }
});

module.exports = router;