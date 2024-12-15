import React, { useState, useEffect } from "react";

const Bill = () => {
    const [bills, setBills] = useState([]); // State to store all bills
    const [selectedBillId, setSelectedBillId] = useState(''); // State for the selected bill
    const [paymentStatus, setPaymentStatus] = useState(''); // State for payment status
    const [note, setNote] = useState(''); // Optional note for disputes

    // Fetch bills from the backend when the component loads
    useEffect(() => {
        fetch("http://localhost:5050/api/bills")
            .then((response) => response.json())
            .then((data) => setBills(data))
            .catch((error) => console.error("Error fetching bills:", error));
    }, []);

    const handlePayment = () => {
        if (!selectedBillId) {
            alert("Please select a bill.");
            return;
        }

        const data = {
            bill_id: selectedBillId,
            payment_status: paymentStatus,
            note: paymentStatus === "disputed" ? note : null, // Attach a note only for disputes
        };

        // Submit payment or dispute status to the backend
        fetch(`http://localhost:5050/api/bills/${selectedBillId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response:", data);
                alert("Payment status updated successfully.");
            })
            .catch((error) => console.error("Error updating payment status:", error));
    };

    return (
        <div>
            <h2>Your Bills</h2>
            <div>
                <h3>All Bills</h3>
                <ul>
                    {bills.map((bill) => (
                        <li key={bill.bill_id}>
                            <strong>Bill ID:</strong> {bill.bill_id} | <strong>Amount:</strong> ${bill.amount} | <strong>Status:</strong> {bill.status}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Update Payment Status</h3>
                <select
                    value={selectedBillId}
                    onChange={(e) => setSelectedBillId(e.target.value)}
                >
                    <option value="">Select a Bill</option>
                    {bills.map((bill) => (
                        <option key={bill.bill_id} value={bill.bill_id}>
                            Bill ID: {bill.bill_id} - Amount: ${bill.amount}
                        </option>
                    ))}
                </select>

                <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                >
                    <option value="">Select Payment Status</option>
                    <option value="paid">Pay Now</option>
                    <option value="disputed">Dispute</option>
                </select>

                {paymentStatus === "disputed" && (
                    <textarea
                        placeholder="Add a note for the dispute"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                )}

                <button onClick={handlePayment}>Submit Payment Status</button>
            </div>
        </div>
    );
};

export default Bill;