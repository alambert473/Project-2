const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Create a new bill
router.post('/', async (req, res) => {
  const { order_id, client_id, amount } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO bills (order_id, client_id, amount, status, generated_at) VALUES (?, ?, ?, "Pending", NOW())',
      [order_id, client_id, amount]
    );
    res.status(201).json({ bill_id: result.insertId });
  } catch (err) {
    console.error('Error creating bill:', err);
    res.status(500).json({ error: 'Failed to create bill.' });
  }
});

// Get all bills
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM bills');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching bills:', err);
    res.status(500).json({ error: 'Failed to fetch bills.' });
  }
});

// Respond to a bill
router.post('/respond', async (req, res) => {
  const { bill_id, responder, note, adjusted_amount } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO billresponses (bill_id, responder, note, adjusted_amount, created_at) VALUES (?, ?, ?, ?, NOW())',
      [bill_id, responder, note, adjusted_amount]
    );
    res.status(201).json({ response_id: result.insertId });
  } catch (err) {
    console.error('Error responding to bill:', err);
    res.status(500).json({ error: 'Failed to respond to bill.' });
  }
});

module.exports = router;