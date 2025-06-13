const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

// Add to cart
router.post('/add-to-cart/:id', async (req, res) => {
  const sessionId = req.sessionID;
  const productId = req.params.id;

  try {
    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId == productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error adding to cart');
  }
});

// View Cart
router.get('/cart', async (req, res) => {
  const sessionId = req.sessionID;
  try {
    const cart = await Cart.findOne({ sessionId }).populate('items.productId');
    console.log('🛒 Loaded cart:', cart);
    res.render('cart', { cart });
  } catch (err) {
    console.error('❌ Error loading cart:', err);
    res.status(500).send('Error loading cart');
  }
});
// Update quantity (+ or -)
router.post('/cart/update/:id', async (req, res) => {
  const sessionId = req.sessionID;
  const { action } = req.body;

  try {
    const cart = await Cart.findOne({ sessionId });

    if (!cart) return res.redirect('/cart');

    const item = cart.items.find(item => item.productId == req.params.id);
    if (!item) return res.redirect('/cart');

    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
      item.quantity -= 1;
    }

    await cart.save();
    res.redirect('/cart');
  } catch (err) {
    res.status(500).send('Error updating cart');
  }
});

// Remove item from cart
router.post('/cart/remove/:id', async (req, res) => {
  const sessionId = req.sessionID;
  try {
    const cart = await Cart.findOne({ sessionId });

    if (!cart) return res.redirect('/cart');

    cart.items = cart.items.filter(item => item.productId != req.params.id);
    await cart.save();
    res.redirect('/cart');
  } catch (err) {
    res.status(500).send('Error removing item');
  }
});


module.exports = router;
