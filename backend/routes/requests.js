const express = require('express');
const router = express.Router();
const dbService = require('../dbService');

// Submit a new request for a quote
router.post('/submit', (req, res) => {
    const { client_id, property_address, square_feet, proposed_price, images, note } = req.body;
    console.log('Submit Quote Request:', req.body);

    const db = dbService.getDbServiceInstance();
    const created_at = new Date().toISOString().split('T')[0];

    const result = db.submitQuoteRequest(client_id, property_address, square_feet, proposed_price, images, note, created_at);

    result
        .then(data => res.status(201).json({ message: 'Quote request submitted successfully', request: data }))
        .catch(err => {
            console.error('Error submitting quote:', err);
            res.status(500).json({ error: 'Failed to submit quote request' });
        });
});

// Submit a response to a quote request
router.post('/respond', (req, res) => {
    const { request_id, responder, note, counter_price, work_start_date, work_end_date } = req.body;
    console.log("Responding to quote:", req.body);

    const db = dbService.getDbServiceInstance();
    const created_at = new Date().toISOString().split('T')[0]; // Current date

    const result = db.submitQuoteResponse(request_id, responder, note, counter_price, work_start_date, work_end_date, created_at);

    result
        .then(data => res.status(201).json({ message: 'Quote response submitted successfully', response: data }))
        .catch(err => {
            console.error('Error submitting quote response:', err);
            res.status(500).json({ error: 'Failed to submit quote response' });
        });
});

// Fetch all responses for a specific quote
router.get('/responses/:request_id', (req, res) => {
    const { request_id } = req.params;
    console.log(`Fetching responses for request: ${request_id}`);

    const db = dbService.getDbServiceInstance();
    const result = db.getQuoteResponses(request_id);

    result
        .then(data => res.status(200).json({ responses: data }))
        .catch(err => {
            console.error('Error fetching responses:', err);
            res.status(500).json({ error: 'Failed to fetch responses' });
        });
});


module.exports = router;