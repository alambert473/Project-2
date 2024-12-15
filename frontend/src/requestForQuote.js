import React, { useState } from "react";

const RequestForQuote = () => {
  const [address, setAddress] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [pictures, setPictures] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("address", address);
    formData.append("squareFeet", squareFeet);
    formData.append("price", price);
    formData.append("note", note);
    for (let i = 0; i < pictures.length; i++) {
      formData.append("pictures", pictures[i]);
    }

    // Make an API call to submit the request
    fetch("http://localhost:5050/api/requests", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log("Request submitted:", data))
      .catch(error => console.error("Error submitting request:", error));
  };

  return (
    <div>
      <h2>Request for Quote</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Property address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Square feet"
          value={squareFeet}
          onChange={(e) => setSquareFeet(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Proposed price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Additional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setPictures(e.target.files)}
          required
        />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestForQuote;