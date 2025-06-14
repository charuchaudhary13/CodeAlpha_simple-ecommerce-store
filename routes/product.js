const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Homepage - List all products with search and category filter
router.get('/', isAuthenticated, async (req, res) => {
  const searchQuery = req.query.search || '';
  const categoryQuery = req.query.category || '';

  try {
    const allProducts = await Product.find();

    let filteredProducts = allProducts;
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase() === categoryQuery.toLowerCase()
      );
    }

    const categories = [...new Set(allProducts.map(product => product.category))];

    res.render('index', {
      products: filteredProducts,
      search: searchQuery,
      selectedCategory: categoryQuery,
      categories
    });
  } catch (err) {
    console.error('❌ Error loading products:', err);
    res.status(500).send('Error loading products');
  }
});

module.exports = router;
