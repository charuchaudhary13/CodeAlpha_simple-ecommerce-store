
require('dotenv').config();



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables from .env
 dotenv.config();

// Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Session setup
app.use(session({
  secret: 'ecommerce_secret_key',
  resave: false,
  saveUninitialized: true //must be true
}));
// Make cart data available in all views
const Cart = require('./models/cart');

app.use(async (req, res, next) => {
  try {
    const sessionId = req.sessionID;
    const cart = await Cart.findOne({ sessionId }).populate('items.productId');
    res.locals.cart = cart;
    next();
  } catch (err) {
    console.error('🛒 Middleware error loading cart:', err);
    res.locals.cart = null;
    next();
  }
});

// MongoDB Connection
// 
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  // mongoose.set('debug', true);


// .then(() => console.log('✅ MongoDB Connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart'); // ✅ enable this

// const cartRoutes = require('./routes/cart'); // Uncomment when cart.js is created

app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes); // ✅ enable this
// app.use('/', cartRoutes); // Uncomment only when cartRoutes is ready

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
