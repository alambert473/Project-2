const express = require("express");
const router = express.Router();
const dbService = require("../dbService");

// Fetch all quotes for a client
router.get("/responses/:client_id", (req, res) => {
    const { client_id } = req.params;
    const db = dbService.getDbServiceInstance();

    db.getAcceptedQuotesByClientId(client_id)
        .then((data) => res.status(200).json(data))
        .catch((err) => {
            console.error("Error fetching accepted quotes:", err.message);
            res.status(500).json({ error: "Failed to fetch accepted quotes" });
        });
});

router.post("/accept-quote", (req, res) => {
    const { request_id, client_id, agreed_price, work_start_date, work_end_date } = req.body;

    if (!request_id || !client_id || !agreed_price || !work_start_date || !work_end_date) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const db = dbService.getDbServiceInstance();

    db.acceptQuoteAndCreateOrder(request_id, client_id, agreed_price, work_start_date, work_end_date)
        .then(() => res.status(201).json({ message: "Order created and request accepted successfully!" }))
        .catch((err) => {
            console.error("Error accepting quote:", err.message);
            res.status(500).json({ error: "Failed to accept quote" });
        });
});


module.exports = router;