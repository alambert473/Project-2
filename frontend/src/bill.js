import React, { useEffect, useState } from "react";
import axios from "axios";

const Bill = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axios.get("http://localhost:5050/bills");
                setBills(response.data);
            } catch (err) {
                console.error("Error fetching bills:", err.message);
            }
        };

        fetchBills();
    }, []);

    return (
        <div>
            <h2>All Bills</h2>
            {bills.length > 0 ? (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Bill ID</th>
                            <th>Order ID</th>
                            <th>Client ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Generated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => (
                            <tr key={bill.bill_id}>
                                <td>{bill.bill_id}</td>
                                <td>{bill.order_id}</td>
                                <td>{bill.client_id}</td>
                                <td>${bill.amount}</td>
                                <td>{bill.status}</td>
                                <td>{new Date(bill.generated_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bills found.</p>
            )}
        </div>
    );
};

export default Bill;