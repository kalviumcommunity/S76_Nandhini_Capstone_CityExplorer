const express = require('express');
const router = express.Router();
const City = require('../models/City');

// @desc    Get all cities
// @route   GET /api/cities
// @access  Public
router.get('/', async (req, res) => {
  try {
    const cities = await City.find({});
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get city by ID
// @route   GET /api/cities/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;