const express = require('express');
const router = express.Router();
const DbService = require('../dbService');

router.post('/register', (req, res) => {
    const { first_name, last_name, address, credit_card_info, phone_number, email, password } = req.body;
    console.log('Register endpoint called with data:', req.body);

    const db = DbService.getDbServiceInstance();
    const registrationDate = new Date().toISOString().split('T')[0];

    const result = db.insertNewUser(
        first_name,
        last_name,
        address,
        credit_card_info,
        phone_number,
        email,
        password,
        registrationDate
    );

    result
        .then(data => res.status(201).json({ message: 'User registered successfully', user: data }))
        .catch(err => {
            console.error('Error in /register:', err);
            res.status(500).json({ error: 'Failed to register user' });
        });
});


// Login a client
router.post('/login', (req, res) => {
  console.log("Client login attempt...");
  const { email, password } = req.body;

  const db = DbService.getDbServiceInstance();
  const result = db.checkClientLogin(email, password);

  result
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({
          success: true,
          message: 'Login successful!',
          client_id: data[0].client_id, 
        });
      } else {
        console.log("Invalid email or password for:", email);
        res.status(401).json({ error: 'Invalid email or password.' });
      }
    })
    .catch((err) => {
      console.error("Error during login:", err);
      res.status(500).json({ error: 'Failed to log in.' });
    });
});

module.exports = router;