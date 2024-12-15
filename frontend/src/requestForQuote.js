import React, { useState } from "react";

const RequestForQuote = () => {
    const [propertyAddress, setPropertyAddress] = useState('');
    const [squareFeet, setSquareFeet] = useState('');
    const [proposedPrice, setProposedPrice] = useState('');
    const [note, setNote] = useState('');
    const [image, setImage] = useState(null); // For image upload
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const clientId = localStorage.getItem('client_id'); // Fetch client_id from localStorage

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append("client_id", clientId);
            formData.append("property_address", propertyAddress);
            formData.append("square_feet", squareFeet);
            formData.append("proposed_price", proposedPrice);
            formData.append("note", note);
            formData.append("image", image); // Send uploaded image

            const response = await fetch('http://localhost:5050/requests/submit', {
                method: 'POST',
                body: formData, // Use FormData for file upload
            });

            if (!response.ok) throw new Error('Failed to submit quote request.');

            setSuccess('Quote request submitted successfully.');
            setPropertyAddress('');
            setSquareFeet('');
            setProposedPrice('');
            setNote('');
            setImage(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Request a Quote</h2>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                <button type="submit">Submit Request</button>
            </form>
        </div>
    );
};

export default RequestForQuote;