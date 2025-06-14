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

  // Just store user info in session for now (for demo only)
  req.session.user = { name, email };
  res.redirect('/');
});

// Handle login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // For demo: log in without checking DB
  req.session.user = { email };
  res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('❌ Error during logout:', err);
      return res.redirect('/');
    }
    res.redirect('/login');
  });
});

module.exports = router;
