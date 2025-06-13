const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Homepage - List all products with search and category filter
router.get('/', async (req, res) => {
  const searchQuery = req.query.search || '';
  const categoryQuery = req.query.category || '';

  try {
    // Fetch all products
    const allProducts = await Product.find();

    // Filter by search term
    let filteredProducts = allProducts;
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase() === categoryQuery.toLowerCase()
      );
    }

    // Get unique categories for dropdown
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
