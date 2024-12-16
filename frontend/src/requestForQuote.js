import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

const RequestForQuote = () => {
    const navigate = useNavigate();
    const [propertyAddress, setPropertyAddress] = useState('');
    const [squareFeet, setSquareFeet] = useState('');
    const [proposedPrice, setProposedPrice] = useState('');
    const [note, setNote] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const clientId = localStorage.getItem('client_id'); // Fetch client_id from localStorage

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const data = {
                client_id: clientId,
                property_address: propertyAddress,
                square_feet: squareFeet,
                proposed_price: proposedPrice,
                note: note
            };

            const response = await fetch('http://localhost:5050/requests/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to submit quote request.');

            setSuccess('Quote request submitted successfully. Redirecting...');
            navigate('/quote-response'); 
            setPropertyAddress('');
            setSquareFeet('');
            setProposedPrice('');
            setNote('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Request a Quote</h2>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Property Address"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Square Feet"
                    value={squareFeet}
                    onChange={(e) => setSquareFeet(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Proposed Price"
                    value={proposedPrice}
                    onChange={(e) => setProposedPrice(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Add any notes"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <button type="submit">Submit Request</button>
            </form>
        </div>
    );
};

export default RequestForQuote;