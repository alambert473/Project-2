import React, { useEffect, useState } from "react";

const QuoteResponse = () => {
    const [requests, setRequests] = useState([]); // Holds pending requests
    const [selectedRequest, setSelectedRequest] = useState(null); // Tracks the selected request
    const [responseNote, setResponseNote] = useState(''); // Note input
    const [counterPrice, setCounterPrice] = useState(''); // Counter price input
    const [workStartDate, setWorkStartDate] = useState(''); // Work start date input
    const [workEndDate, setWorkEndDate] = useState(''); // Work end date input

    const userEmail = JSON.parse(localStorage.getItem("email"));
    const isDavidSmith = userEmail === "david@smith.com"; 

    useEffect(() => {
        if (isDavidSmith) {
            fetch("http://localhost:5050/requests/pending-requests")
                .then((res) => res.json())
                .then((data) => setRequests(data))
                .catch((err) => console.error("Error fetching requests:", err));
        }
    }, [isDavidSmith]);

    // Select a specific request
    const handleSelectRequest = (request) => {
        setSelectedRequest(request);
        setResponseNote('');
        setCounterPrice('');
        setWorkStartDate('');
        setWorkEndDate('');
    };

    // Submit a response to the selected request
    const handleSubmitResponse = () => {
        if (!selectedRequest) return;

        const data = {
            request_id: selectedRequest.request_id,
            responder: "David Smith", // Fixed responder name
            note: responseNote,
            counter_price: counterPrice,
            work_start_date: workStartDate,
            work_end_date: workEndDate,
        };

        fetch("http://localhost:5050/requests/respond", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("Response submitted successfully:", result);
                alert("Response submitted!");
                setSelectedRequest(null);
            })
            .catch((err) => console.error("Error submitting response:", err));
    };

    return (
        <div>
            <h2>Respond to Requests</h2>

            {isDavidSmith ? (
                <div>
                    <h3>Pending Requests</h3>
                    <ul>
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <li key={req.request_id}>
                                    <strong>{req.property_address}</strong> - {req.square_feet} sq ft - Proposed: ${req.proposed_price}
                                    <button onClick={() => handleSelectRequest(req)}>Respond</button>
                                </li>
                            ))
                        ) : (
                            <p>No pending requests.</p>
                        )}
                    </ul>

                    {selectedRequest && (
                        <div>
                            <h3>Respond to Request</h3>
                            <p><strong>Property:</strong> {selectedRequest.property_address}</p>
                            <p><strong>Proposed Price:</strong> ${selectedRequest.proposed_price}</p>

                            <textarea
                                placeholder="Enter a note"
                                value={responseNote}
                                onChange={(e) => setResponseNote(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Counter Price"
                                value={counterPrice}
                                onChange={(e) => setCounterPrice(e.target.value)}
                            />
                            <input
                                type="date"
                                placeholder="Work Start Date"
                                value={workStartDate}
                                onChange={(e) => setWorkStartDate(e.target.value)}
                            />
                            <input
                                type="date"
                                placeholder="Work End Date"
                                value={workEndDate}
                                onChange={(e) => setWorkEndDate(e.target.value)}
                            />
                            <button onClick={handleSubmitResponse}>Submit Response</button>
                        </div>
                    )}
                </div>
            ) : (
                <p style={{ color: "red" }}>User is not David Smith</p>
            )}
        </div>
    );
};

export default QuoteResponse;