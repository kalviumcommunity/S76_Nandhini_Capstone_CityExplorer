const mongoose = require('mongoose');
const featureSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  icon: { 
    type: String, 
    required: true 
  },
  colorClass: { 
    type: String, 
    default: 'primary' 
  }
});

module.exports = mongoose.model('Feature', featureSchema);