const express = require('express');
const router = express.Router();
const dbService = require('../dbService');

// Fetch all orders
router.get('/getorders', (req, res) => {
  const db = dbService.getDbServiceInstance();

  db.getAllOrders()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.error("Error fetching orders:", err.message);
      res.status(500).json({ error: "Failed to fetch orders" });
    });
});

module.exports = router;
