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
router.get('/', async (req, res) => {
  try {
    const cities = await City.find({});
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc Get city by ID
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (city) res.json(city);
    else res.status(404).json({ message: 'City not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc Update city information
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid city ID format' });
    }

    const { error } = cityUpdateSchema.validate(updateData);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existingCity = await City.findById(id);
    if (!existingCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    if (updateData.name) {
      const duplicateCity = await City.findOne({
        name: updateData.name,
        ...(updateData.country ? { country: updateData.country } : {}),
        _id: { $ne: id }
      });
      if (duplicateCity) {
        return res.status(400).json({ message: 'City with this name already exists' });
      }
    }

    const updatedCity = await City.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      message: 'City updated successfully',
      city: updatedCity
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;