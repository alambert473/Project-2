import React, { useState, useEffect } from "react";

const Order = () => {
    const [orders, setOrders] = useState([]); // State to store all orders
    const [selectedOrderId, setSelectedOrderId] = useState(''); // State for the selected order
    const [orderDetails, setOrderDetails] = useState(null); // State for selected order details

    // Fetch all orders from the backend when the component loads
    useEffect(() => {
        fetch("http://localhost:5050/api/orders")
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error("Error fetching orders:", error));
    }, []);

    // Fetch order details when a specific order is selected
    const fetchOrderDetails = (orderId) => {
        fetch(`http://localhost:5050/api/orders/${orderId}`)
            .then((response) => response.json())
            .then((data) => setOrderDetails(data))
            .catch((error) => console.error("Error fetching order details:", error));
    };

    const handleOrderSelection = (e) => {
        const orderId = e.target.value;
        setSelectedOrderId(orderId);

        if (orderId) {
            fetchOrderDetails(orderId); // Fetch details for the selected order
        } else {
            setOrderDetails(null); // Clear details if no order is selected
        }
    };

    return (
        <div>
            <h2>Your Orders</h2>
            <div>
                <h3>All Orders</h3>
                <select
                    value={selectedOrderId}
                    onChange={handleOrderSelection}
                >
                    <option value="">Select an Order</option>
                    {orders.map((order) => (
                        <option key={order.order_id} value={order.order_id}>
                            Order ID: {order.order_id} - Price: ${order.agreed_price}
                        </option>
                    ))}
                </select>
            </div>

            {orderDetails ? (
                <div>
                    <h3>Order Details</h3>
                    <p><strong>Order ID:</strong> {orderDetails.order_id}</p>
                    <p><strong>Request ID:</strong> {orderDetails.request_id}</p>
                    <p><strong>Client ID:</strong> {orderDetails.client_id}</p>
                    <p><strong>Agreed Price:</strong> ${orderDetails.agreed_price}</p>
                    <p><strong>Work Start Date:</strong> {orderDetails.work_start_date}</p>
                    <p><strong>Work End Date:</strong> {orderDetails.work_end_date}</p>
                    <p><strong>Status:</strong> {orderDetails.status}</p>
                </div>
            ) : (
                <p>Please select an order to view its details.</p>
            )}
        </div>
    );
};

export default Order;