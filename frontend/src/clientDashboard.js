import React from "react";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
    return (
        <div className="dashboard">
            <h2>Client Dashboard</h2>
            <ul>
                <li><Link to="/request-quote">Request a Quote</Link></li>
                <li><Link to="/quote-response">Accept a qoute</Link></li>
                <li><Link to="/Viewqoute">View your qoutes</Link></li>
                <li><Link to="/orders">View Your Orders</Link></li>
                <li><Link to="/bill">View Your Bills</Link></li>
                <li><Link to="/addbill">Add a Bill</Link></li>
            </ul>
        </div>
    );
};

export default ClientDashboard;
