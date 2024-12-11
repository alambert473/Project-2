const express = require('express');
const cors = require('cors'); // Import CORS
const bodyParser = require('body-parser');
require('dotenv').config();

const clientsRoutes = require('./routes/clients');
const requestsRoutes = require('./routes/requests');
const ordersRoutes = require('./routes/orders');
const billsRoutes = require('./routes/bills');
const authRoutes = require('./routes/auth'); // Import the auth routes

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ // Enable CORS
  origin: 'http://localhost:3000', // Allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

app.use(bodyParser.json());

// Routes
app.use('/api/clients', clientsRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/bills', billsRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});