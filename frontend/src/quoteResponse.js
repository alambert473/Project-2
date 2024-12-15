import React, { useState } from "react";

const QuoteResponse = () => {
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { status, note };

    fetch("http://localhost:5050/api/quote-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => console.log("Response submitted:", data))
      .catch(error => console.error("Error submitting response:", error));
  };

  return (
    <div>
      <h2>Respond to Quote</h2>
      <form onSubmit={handleSubmit}>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select status</option>
          <option value="accepted">Accept</option>
          <option value="rejected">Reject</option>
        </select>
        <textarea
          placeholder="Add a note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuoteResponse;