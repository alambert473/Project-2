const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const clientsRoutes = require('./routes/clients');
const requestsRoutes = require('./routes/requests');
const ordersRoutes = require('./routes/orders');
const billsRoutes = require('./routes/bills');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/clients', clientsRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/bills', billsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});