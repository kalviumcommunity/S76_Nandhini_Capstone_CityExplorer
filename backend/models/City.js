const mongoose = require('mongoose');
const citySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  country: { 
    type: String, 
    required: true, 
    trim: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 0, 
    max: 5, 
    default: 0 
  },
  reviewCount: { 
    type: Number, 
    default: 0 
  },
  placeCount: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('City', citySchema);