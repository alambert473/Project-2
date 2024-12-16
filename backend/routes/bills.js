const express = require('express');
const router = express.Router();
const dbService = require('../dbService');

// 1. Generate a new bill (for David Smith)
router.post('/generate', (req, res) => {
    const { client_id, order_id, total_amount, note } = req.body;
    const db = dbService.getDbServiceInstance();

    const result = db.generateBill(client_id, order_id, total_amount, note);

    result
        .then(() => res.status(201).json({ message: 'Bill generated successfully!' }))
        .catch(err => {
            console.error('Error generating bill:', err);
            res.status(500).json({ error: 'Failed to generate bill.' });
        });
});

// 2. Fetch bills for a client
router.get('/client/:client_id', (req, res) => {
    const { client_id } = req.params;
    const db = dbService.getDbServiceInstance();

    db.fetchClientBills(client_id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: 'Failed to fetch bills.' }));
});

// 3. Pay a bill
router.patch('/pay/:bill_id', (req, res) => {
    const { bill_id } = req.params;
    const db = dbService.getDbServiceInstance();

    db.payBill(bill_id)
        .then(() => res.status(200).json({ message: 'Bill marked as paid!' }))
        .catch(err => res.status(500).json({ error: 'Failed to update bill status.' }));
});

// 4. Dispute a bill
router.patch('/dispute/:bill_id', (req, res) => {
    const { bill_id } = req.params;
    const { note } = req.body;
    const db = dbService.getDbServiceInstance();

    db.disputeBill(bill_id, note)
        .then(() => res.status(200).json({ message: 'Bill disputed successfully!' }))
        .catch(err => res.status(500).json({ error: 'Failed to dispute bill.' }));
});

module.exports = router;