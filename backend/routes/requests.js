const express = require('express');
const router = express.Router();
const dbService = require('../dbService');

// Submit a new request for a quote or accept an existing one
router.post('/submit', (req, res) => {
    const { client_id, property_address, square_feet, proposed_price, note, request_id } = req.body;
    console.log('Submit or Accept Quote Request:', req.body);

    const db = dbService.getDbServiceInstance();
    const created_at = new Date().toISOString().split('T')[0];

    const result = db.submitQuoteRequest(client_id, property_address, square_feet, proposed_price, note, created_at, request_id);

    result
        .then(() => {
            const message = request_id
                ? 'Quote request status updated to Submitted.'
                : 'New quote request created successfully.';
            res.status(201).json({ message });
        })
        .catch(err => {
            console.error('Error submitting or accepting quote:', err);
            res.status(500).json({ error: 'Failed to process quote request' });
        });
});

// Fetch all pending quote requests
router.get('/pending-requests', (req, res) => {
    const db = dbService.getDbServiceInstance();

    db.getPendingRequests()
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.error("Error fetching pending requests:", err);
            res.status(500).json({ error: 'Failed to fetch pending requests' });
        });
});

router.post('/respond', (req, res) => {
    const { request_id, responder, note, counter_price, work_start_date, work_end_date } = req.body;
    console.log("Responding to request:", req.body);

    const db = dbService.getDbServiceInstance();
    const created_at = new Date().toISOString().split('T')[0];

    db.respondToQuoteRequest(request_id, responder, note, counter_price, work_start_date, work_end_date, created_at)
        .then(() => res.status(201).json({ message: 'Response submitted and status updated to Submitted.' }))
        .catch(err => {
            console.error("Error submitting response:", err);
            res.status(500).json({ error: 'Failed to submit response.' });
        });
});

// Fetch all quotes for a specific client
router.get('/quotes/:client_id', (req, res) => {
    const { client_id } = req.params;
    console.log("Fetching quotes for client ID:", client_id);

    const db = dbService.getDbServiceInstance();

    db.getQuotesByClientId(client_id)
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.error("Error fetching quotes:", err);
            res.status(500).json({ error: "Failed to fetch quotes" });
        });
});

module.exports = router;