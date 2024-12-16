import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5050/orders/getorders");
                setOrders(response.data);
            } catch (err) {
                console.error("Error fetching orders:", err.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2>All Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order.order_id}>
                            <strong>Order ID:</strong> {order.order_id} <br />
                            <strong>Client ID:</strong> {order.client_id} <br />
                            <strong>Agreed Price:</strong> ${order.agreed_price} <br />
                            <strong>Work Period:</strong> {order.work_start_date} to {order.work_end_date} <br />
                            <strong>Status:</strong> {order.status} <br />
                            <strong>Created At:</strong> {order.created_at}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default Orders;