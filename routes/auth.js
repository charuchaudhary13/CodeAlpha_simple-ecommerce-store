const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register Route (GET)
router.get('/register', (req, res) => {
    res.render('register');
});

// Register Route (POST)
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.send('User already exists');

        const user = new User({ username, email, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Registration error');
    }
});

// Login Route (GET)
router.get('/login', (req, res) => {
    res.render('login');
});

// Login Route (POST)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.send('Invalid email or password');
        }
        req.session.userId = user._id;
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Login error');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
