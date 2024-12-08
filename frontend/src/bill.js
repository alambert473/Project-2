import React, { useState } from "react";

const Bill = () => {
    const [paymentStatus, setPaymentStatus] = useState('');

    const handlePayment = () => {
        // Logic for handling payment
        console.log(paymentStatus);
    };

    return (
        <div>
            <h2>Your Bill</h2>
            {/* Display bill details here */}
            <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                <option value="">Select payment status</option>
                <option value="paid">Pay Now</option>
                <option value="disputed">Dispute</option>
            </select>
            <button onClick={handlePayment}>Submit Payment Status</button>
        </div>
    );
};

export default Bill;
