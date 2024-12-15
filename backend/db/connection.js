const mysql = require('mysql2');
require('dotenv').config();

// Create a database connection pool
const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'drivewaysealing',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Log connection success or failure
connection.getConnection((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected successfully.');
  }
});

module.exports = connection.promise();