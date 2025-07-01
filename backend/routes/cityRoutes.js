const express = require('express');
const router = express.Router();
const City = require('../models/City');
const Joi = require('joi');

// Validation schema for city updates
const cityUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim(),
  country: Joi.string().min(2).max(100).trim(),
  imageUrl: Joi.string().uri(),
  rating: Joi.number().min(0).max(5),
  reviewCount: Joi.number().min(0),
  placeCount: Joi.number().min(0)
});

// @desc Get all cities
// @route GET /api/cities
// @access Public
router.get('/', async (req, res) => {
  try {
    const cities = await City.find({});
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc Get city by ID
// @route GET /api/cities/:id
// @access Public
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

// ============ NEW PUT ENDPOINT ============
// @desc Update city information
// @route PUT /api/cities/:id
// @access Public
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate city ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid city ID format' });
    }

    // Validate update data
    const { error } = cityUpdateSchema.validate(updateData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if city exists
    const existingCity = await City.findById(id);
    if (!existingCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    // If updating name, check for duplicates
    if (updateData.name && updateData.name !== existingCity.name) {
      const duplicateCity = await City.findOne({ 
        name: updateData.name, 
        country: updateData.country || existingCity.country,
        _id: { $ne: id }
      });
      if (duplicateCity) {
        return res.status(400).json({ message: 'City with this name already exists in this country' });
      }
    }

    // Update city with new data
    const updatedCity = await City.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, // Return updated document
        runValidators: true // Run mongoose validations
      }
    );

    res.status(200).json({
      message: 'City updated successfully',
      city: updatedCity
    });

  } catch (error) {
    console.error('City Update Error:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;