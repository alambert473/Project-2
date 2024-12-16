import React, { useState, useEffect } from "react";

const Bills = () => {
    const [bills, setBills] = useState([]); // All fetched bills
    const [selectedBillId, setSelectedBillId] = useState(""); // Selected bill to act on
    const [status, setStatus] = useState(""); // Payment status: paid or disputed
    const [note, setNote] = useState(""); // Optional note for disputes
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const clientId = localStorage.getItem("client_id"); // Fetch client ID from localStorage

    // Function to calculate if the bill is overdue
    const isOverdue = (createdAt) => {
        const billDate = new Date(createdAt);
        const dueDate = new Date(billDate);
        dueDate.setDate(dueDate.getDate() + 7); // Bill is overdue after 7 days
        return new Date() > dueDate;
    };

    // Function to check if the bill was paid within 24 hours
    const paidWithin24Hours = (createdAt, paidAt) => {
        if (!paidAt) return false;
        const billDate = new Date(createdAt);
        const paymentDate = new Date(paidAt);
        const timeDifference = paymentDate - billDate;
        return timeDifference <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    };

    // Function to fetch bills for the logged-in client
    useEffect(() => {
        if (!clientId) {
            setError("Client not logged in. Please log in first.");
            return;
        }

        fetch(`http://localhost:5050/bills/client/${clientId}`)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch bills.");
                return response.json();
            })
            .then((data) => setBills(data))
            .catch((err) => setError(err.message));
    }, [clientId]);

    // Filter overdue bills
    const overdueBills = bills.filter(bill => isOverdue(bill.created_at) && !bill.paid_at);

    // Filter bad clients (clients who have never paid any bill after due date)
    const badClients = bills.filter(bill => !bill.paid_at && isOverdue(bill.created_at));

    // Filter good clients (clients who paid within 24 hours)
    const goodClients = bills.filter(bill => paidWithin24Hours(bill.created_at, bill.paid_at));

    // Handle payment or dispute action
    const handleAction = async () => {
        setError("");
        setSuccess("");

        if (!selectedBillId || !status) {
            setError("Please select a bill and an action.");
            return;
        }

        try {
            const endpoint =
                status === "paid"
                    ? `http://localhost:5050/bills/pay/${selectedBillId}`
                    : `http://localhost:5050/bills/dispute/${selectedBillId}`;
            const body = status === "disputed" ? JSON.stringify({ note }) : null;

            const response = await fetch(endpoint, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: body,
            });

            if (!response.ok) throw new Error("Failed to update bill status.");

            setSuccess(`Bill ${status === "paid" ? "paid" : "disputed"} successfully!`);
            setStatus("");
            setSelectedBillId("");
            setNote("");

            // Refresh bills after an action
            fetch(`http://localhost:5050/bills/client/${clientId}`)
                .then((response) => response.json())
                .then((data) => setBills(data));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Your Bills</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <div>
                <h3>All Bills</h3>
                {bills.length > 0 ? (
                    <table border="1" width="100%">
                        <thead>
                            <tr>
                                <th>Bill ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Paid At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill) => (
                                <tr key={bill.bill_id}>
                                    <td>{bill.bill_id}</td>
                                    <td>${bill.total_amount}</td>
                                    <td>{bill.status}</td>
                                    <td>{bill.created_at}</td>
                                    <td>{bill.paid_at || "Not Paid"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No bills found.</p>
                )}
            </div>

            <div>
                <h3>Overdue Bills</h3>
                {overdueBills.length > 0 ? (
                    <ul>
                        {overdueBills.map((bill) => (
                            <li key={bill.bill_id}>
                                Bill ID: {bill.bill_id} - Amount: ${bill.total_amount} - Due Date: {bill.created_at}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No overdue bills.</p>
                )}
            </div>

            <div>
                <h3>Bad Clients</h3>
                {badClients.length > 0 ? (
                    <ul>
                        {badClients.map((bill) => (
                            <li key={bill.bill_id}>
                                Bill ID: {bill.bill_id} - Amount: ${bill.total_amount} - Due Date: {bill.created_at}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bad clients.</p>
                )}
            </div>

            <div>
                <h3>Good Clients</h3>
                {goodClients.length > 0 ? (
                    <ul>
                        {goodClients.map((bill) => (
                            <li key={bill.bill_id}>
                                Bill ID: {bill.bill_id} - Amount: ${bill.total_amount} - Paid At: {bill.paid_at}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No good clients.</p>
                )}
            </div>

            <div>
                <h3>Update Bill Status</h3>
                <select value={selectedBillId} onChange={(e) => setSelectedBillId(e.target.value)}>
                    <option value="">Select a Bill</option>
                    {bills.map((bill) => (
                        <option key={bill.bill_id} value={bill.bill_id}>
                            Bill ID: {bill.bill_id} - Amount: ${bill.total_amount} - Status: {bill.status}
                        </option>
                    ))}
                </select>

                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select Action</option>
                    <option value="paid">Pay</option>
                    <option value="disputed">Dispute</option>
                </select>

                {status === "disputed" && (
                    <textarea
                        placeholder="Add a note for the dispute"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                )}

                <button onClick={handleAction}>Submit</button>
            </div>
        </div>
    );
};

export default Bills;
