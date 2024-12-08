import React, { useState } from "react";

const RequestForQuote = () => {
    const [address, setAddress] = useState('');
    const [squareFeet, setSquareFeet] = useState('');
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');
    const [pictures, setPictures] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for sending the quote request
        console.log({ address, squareFeet, price, note, pictures });
    };

    return (
        <div>
            <h2>Request for Quote</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Property address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                <input type="number" placeholder="Square feet" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} required />
                <input type="text" placeholder="Proposed price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <textarea placeholder="Additional note" value={note} onChange={(e) => setNote(e.target.value)} />
                <input type="file" onChange={(e) => setPictures(e.target.files)} multiple required />
                <button type="submit">Submit Request</button>
            </form>
        </div>
    );
};

export default RequestForQuote;
