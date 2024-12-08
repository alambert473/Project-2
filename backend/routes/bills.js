const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Create a bill
router.post('/', async (req, res) => {
  const { order_id, client_id, amount } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO Bills (order_id, client_id, amount) VALUES (?, ?, ?)',
      [order_id, client_id, amount]
    );
    res.status(201).json({ bill_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get all bills
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Bills');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;