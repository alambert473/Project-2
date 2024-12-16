import React, { useEffect, useState } from "react";
import axios from "axios";

const Viewqoute = () => {
    const [quoteResponses, setQuoteResponses] = useState([]);

    useEffect(() => {
        const fetchQuoteResponses = async () => {
            try {
                const client_id = localStorage.getItem('client_id') || 4; // Fallback to 4 if client_id is not in localStorage
                const response = await axios.get(`http://localhost:5050/quotes/responses/${client_id}`);
                setQuoteResponses(response.data);
            } catch (err) {
                console.error("Error fetching quote responses:", err.message);
            }
        };

        fetchQuoteResponses();
    }, []);

    const acceptQuote = async (quote) => {
        try {
            const payload = {
                request_id: quote.request_id,
                client_id: localStorage.getItem('client_id') || 4, // Ensure client_id is available
                agreed_price: quote.counter_price,
                work_start_date: quote.work_start_date,
                work_end_date: quote.work_end_date,
            };
            await axios.post("http://localhost:5050/quotes/accept-quote", payload);
            alert("Quote accepted successfully!");
            // Refresh the quotes after accepting
            setQuoteResponses((prev) => prev.filter((q) => q.request_id !== quote.request_id));
        } catch (err) {
            console.error("Error accepting quote:", err.message);
            alert("Failed to accept quote.");
        }
    };

    return (
        <div>
            <h2>View Your Quotes</h2>
            <ul>
                {quoteResponses.length > 0 ? (
                    quoteResponses.map((quote, index) => (
                        <li key={index}>
                            <strong>Property:</strong> {quote.property_address} | 
                            <strong> Size:</strong> {quote.square_feet} sq ft <br />
                            <strong>Counter Price:</strong> ${quote.counter_price || "N/A"} <br />
                            <strong>Work Period:</strong> {quote.work_start_date || "N/A"} to {quote.work_end_date || "N/A"} <br />
                            <strong>Note:</strong> {quote.note || "No note provided"} <br />
                            <button onClick={() => acceptQuote(quote)}>Accept Quote</button>
                        </li>
                    ))
                ) : (
                    <p>No quotes available to accept.</p>
                )}
            </ul>
        </div>
    );
};

export default Viewqoute;