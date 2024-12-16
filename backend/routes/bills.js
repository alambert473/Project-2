const express = require("express");
const router = express.Router();
const dbService = require("../dbService");

// Generate a new bill
router.post("/generate", (req, res) => {
    const { order_id, client_id, amount } = req.body;
    const db = dbService.getDbServiceInstance();

    db.generateBill(order_id, client_id, amount)
        .then(() => res.status(201).json({ message: "Bill generated successfully!" }))
        .catch((err) => res.status(500).json({ error: "Failed to generate bill" }));
});

// Fetch bills for a client
router.get("/:client_id", (req, res) => {
    const { client_id } = req.params;
    const db = dbService.getDbServiceInstance();

    db.getBillsByClientId(client_id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json({ error: "Failed to fetch bills" }));
});

// Update bill status
router.put("/update", (req, res) => {
    const { bill_id, status } = req.body;
    const db = dbService.getDbServiceInstance();

    db.updateBillStatus(bill_id, status)
        .then(() => res.status(200).json({ message: "Bill status updated successfully!" }))
        .catch((err) => res.status(500).json({ error: "Failed to update bill status" }));
});

router.post("/add", (req, res) => {
    const { order_id, client_id, amount } = req.body;
    const db = dbService.getDbServiceInstance();

    db.generateBill(order_id, client_id, amount)
        .then(() => res.status(201).json({ message: "Bill added successfully!" }))
        .catch((err) => res.status(500).json({ error: "Failed to add bill" }));
});

// Fetch all bills
router.get("/", (req, res) => {
    const db = dbService.getDbServiceInstance();

    db.getAllBills()
        .then((data) => res.status(200).json(data))
        .catch((err) => {
            console.error("Error fetching bills:", err.message);
            res.status(500).json({ error: "Failed to fetch bills." });
        });
});

module.exports = router;