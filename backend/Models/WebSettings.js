const mongoose = require('mongoose');

const webSettingsSchema = new mongoose.Schema({
  
  favicon: {
    type: String, // URL or path to the image
    default: ""
  },
  squareLogo: {
    type: String,
    default: ""
  },
  landscapeLogo: {
    type: String,
    default: ""
  },
  // Organization Details
  organizationName: {
    type: String,
    required: true,
    trim: true
  },
  organizationPhone: {
    type: String,
    trim: true
  },
  organizationEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  organizationAddress: {
    type: String,
    trim: true
  },
  businesscategory:{
    type: String,
     trim: true
  },
  city: {
    type: String,
    trim: true
  },
  postCode: {
    type: String,
    trim: true
  },
  stateCountry: {
    type: String,
    trim: true
  },
  countryRegion: {
    type: String,
    trim: true
  },
  
  // Language and Time Settings
  organizationAddress: {
    type: String,
    trim: true
  },
  // Domain Settings
  subDomain: {
    type: String,
    trim: true,
    lowercase: true
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
webSettingsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const WebSettings = mongoose.model('WebSettings', webSettingsSchema);

module.exports = WebSettings;