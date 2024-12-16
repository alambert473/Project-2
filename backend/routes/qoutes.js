const express = require("express");
const router = express.Router();
const dbService = require("../dbService");

// Fetch all quotes for a client
router.get("/responses/:client_id", (req, res) => {
    const { client_id } = req.params;
    const db = dbService.getDbServiceInstance();

    db.getQuotesByClientId(client_id)
        .then((data) => res.status(200).json(data))
        .catch((err) => {
            console.error("Error fetching quotes:", err.message);
            res.status(500).json({ error: "Failed to fetch quotes" });
        });
});

// Accept a quote and create an order
router.post("/accept-quote", (req, res) => {
    const { request_id, client_id, agreed_price, work_start_date, work_end_date } = req.body;

    const db = dbService.getDbServiceInstance();

    db.acceptQuoteAndCreateOrder(request_id, client_id, agreed_price, work_start_date, work_end_date)
        .then(() => res.status(201).json({ message: "Quote accepted and order created successfully!" }))
        .catch((err) => {
            console.error("Error accepting quote:", err.message);
            res.status(500).json({ error: "Failed to accept quote" });
        });
});

// Respond to a quote request
router.post("/respond", (req, res) => {
    const { request_id, responder, note, counter_price, work_start_date, work_end_date } = req.body;

    const db = dbService.getDbServiceInstance();
    const created_at = new Date().toISOString().split("T")[0];

    db.submitQuoteResponse(request_id, responder, note, counter_price, work_start_date, work_end_date, created_at)
        .then(() => res.status(201).json({ message: "Quote response submitted successfully!" }))
        .catch((err) => {
            console.error("Error responding to quote:", err.message);
            res.status(500).json({ error: "Failed to respond to quote" });
        });
});

module.exports = router;