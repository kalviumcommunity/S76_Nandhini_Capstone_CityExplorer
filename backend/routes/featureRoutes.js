const express = require('express');
const router = express.Router();
const Feature = require('../models/Feature');
const Joi = require('joi');

// Validation schema for feature updates
const featureUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(100).trim(),
  description: Joi.string().min(10).max(500),
  icon: Joi.string().min(1).max(50),
  colorClass: Joi.string().min(1).max(50)
});

// @desc Get all features
// @route GET /api/features
// @access Public
router.get('/', async (req, res) => {
  try {
    const features = await Feature.find({});
    res.json(features);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc Get feature by ID
// @route GET /api/features/:id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    if (feature) {
      res.json(feature);
    } else {
      res.status(404).json({ message: 'Feature not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ============ NEW PUT ENDPOINT ============
// @desc Update feature
// @route PUT /api/features/:id
// @access Public
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate feature ID
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: 'Invalid feature ID' });
}

    // Validate update data
    const { error } = featureUpdateSchema.validate(updateData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if feature exists
    const existingFeature = await Feature.findById(id);
    if (!existingFeature) {
      return res.status(404).json({ message: 'Feature not found' });
    }

    // Update feature with new data
    const updatedFeature = await Feature.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, // Return updated document
        runValidators: true // Run mongoose validations
      }
    );

    res.status(200).json({
      message: 'Feature updated successfully',
      feature: updatedFeature
    });

  } catch (error) {
    console.error('Feature Update Error:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;