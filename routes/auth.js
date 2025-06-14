 const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Register page
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // TODO: Add registration logic
  res.send('Registration logic here');
});

// Handle login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // TODO: Add login logic
  res.send('Login logic here');
});

module.exports = router;

  