const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const clientsRoutes = require('./routes/clients');
const requestsRoutes = require('./routes/requests'); // Import the requests routes
const quotesRoutes = require('./routes/qoutes'); // Import the quotes routes
const ordersRoutes = require('./routes/orders'); // Import the orders routes
const billsRoutes = require('./routes/bills');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/clients', clientsRoutes);
app.use('/requests', requestsRoutes); // Use the /requests route
app.use('/quotes', quotesRoutes); // Use the /quotes route
app.use('/orders', ordersRoutes); // Use the /orders route
app.use('/bills', billsRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
