import React from "react";
import { Link } from "react-router-dom";

const ContractorDashboard = () => {
    return (
        <div className="dashboard">
            <h2>Contractor Dashboard</h2>
            <ul>
                <li><Link to="/quote-response">Manage Quotes</Link></li>
                <li><Link to="/order">Manage Orders</Link></li>
                <li><Link to="/bill">Manage Bills</Link></li>
                <li><Link to="/report">Generate Report</Link></li>
            </ul>
        </div>
    );
};

export default ContractorDashboard;
