import React, { useState } from "react";

const QuoteResponse = ({ requestId }) => { // Expect requestId as a prop
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch("http://localhost:5050/api/quote-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request_id: requestId, // Pass request_id dynamically
          status,
          note,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit quote response.');

      setSuccess('Quote response submitted successfully.');
      setStatus('');
      setNote('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Respond to Quote</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select Status</option>
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