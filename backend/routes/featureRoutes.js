const express = require('express');
const router = express.Router();
const Feature = require('../models/Feature');

// @desc    Get all features
// @route   GET /api/features
// @access  Public

router.get('/', async (req, res) => {
  try {
    const features = await Feature.find({});
    res.json(features);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
module.exports = router;