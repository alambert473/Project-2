import React, { useState } from "react";
import axios from "axios";

const AddBill = () => {
    const [formData, setFormData] = useState({
        order_id: "",
        amount: "",
    });

    const client_id = localStorage.getItem("client_id"); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (client_id !== "5") { 
            alert("Only David can add a bill!");
            return;
        }

        try {
            const payload = { ...formData, client_id: "5" }; // Add David's client_id
            await axios.post("http://localhost:5050/bills/add", payload);
            alert("Bill added successfully!");
            setFormData({ order_id: "", amount: "" });
        } catch (err) {
            console.error("Error adding bill:", err.message);
            alert("Failed to add bill.");
        }
    };

    return (
        <div>
            <h2>Add a Bill</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Order ID:
                    <input
                        type="text"
                        name="order_id"
                        value={formData.order_id}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Bill</button>
            </form>
        </div>
    );
};

export default AddBill;