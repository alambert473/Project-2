const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const clientsRoutes = require('./routes/clients.js');
const requestsRoutes = require('./routes/requests.js');
const billsRoutes = require('./routes/bills.js');
const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/clients', clientsRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/bills', billsRoutes);
app.use('/api/auth', authRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});