const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Create an order
router.post('/', async (req, res) => {
  const { request_id, client_id, agreed_price, work_start_date, work_end_date } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO Orders (request_id, client_id, agreed_price, work_start_date, work_end_date) VALUES (?, ?, ?, ?, ?)',
      [request_id, client_id, agreed_price, work_start_date, work_end_date]
    );
    res.status(201).json({ order_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Orders');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;