import React, { useState } from "react";

const QuoteResponse = () => {
    const [quoteStatus, setQuoteStatus] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for responding to a quote request
        console.log({ quoteStatus, note });
    };

    return (
        <div>
            <h2>Respond to Quote Request</h2>
            <form onSubmit={handleSubmit}>
                <select value={quoteStatus} onChange={(e) => setQuoteStatus(e.target.value)} required>
                    <option value="">Select status</option>
                    <option value="accepted">Accept Quote</option>
                    <option value="rejected">Reject Quote</option>
                </select>
                <textarea placeholder="Your note" value={note} onChange={(e) => setNote(e.target.value)} />
                <button type="submit">Submit Response</button>
            </form>
        </div>
    );
};

export default QuoteResponse;
