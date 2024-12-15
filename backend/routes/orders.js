const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Create a new order
router.post('/', async (req, res) => {
  const { request_id, client_id, agreed_price, work_start_date, work_end_date } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO orders (request_id, client_id, agreed_price, work_start_date, work_end_date, status, created_at) VALUES (?, ?, ?, ?, ?, "Pending", NOW())',
      [request_id, client_id, agreed_price, work_start_date, work_end_date]
    );
    res.status(201).json({ order_id: result.insertId });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order.' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM orders');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

// Update order status
router.put('/status', async (req, res) => {
  const { order_id, status } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE orders SET status = ? WHERE order_id = ?',
      [status, order_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order status updated successfully.' });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Failed to update order status.' });
  }
});

module.exports = router;