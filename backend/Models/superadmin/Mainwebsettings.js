// models/WebSettings.js

const mongoose = require('mongoose');

const webSettingsSchema = new mongoose.Schema({
  
  // Basic Information
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  tagline: {
    type: String,
    required: [true, 'Tagline is required'],
    trim: true
  },
  
  // Organization Details
  organizationName: {
    type: String,
    required: [true, 'Organization name is required'],
    trim: true
  },
  organizationPhone: {
    type: String,
    required: [true, 'Organization phone is required'],
    validate: {
      validator: function(v) {
        return /^[\d\s+\-()]{10,}$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  organizationEmail: {
    type: String,
    required: [true, 'Organization email is required'],
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email address'
    },
    lowercase: true,
    trim: true
  },
  
  // Address Information
  organizationAddress: {
    type: String,
    required: [true, 'Organization address is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  postCode: {
    type: String,
    required: [true, 'Post code is required'],
    trim: true
  },
  stateCountry: {
    type: String,
    required: [true, 'State/Country is required'],
    trim: true
  },
  countryRegion: {
    type: String,
    required: [true, 'Country/Region is required'],
    trim: true
  },
  
  // Business Information
  businesscategory: {
    type: String,
    required: [true, 'Business category is required'],
    trim: true
  },
  // Media Assets
  favicon: {
    type: String,
    default: ''
  },
  squareLogo: {
    type: String,
    default: ''
  },
  landscapeLogo: {
    type: String,
    default: ''
  },
  
  // Status
  isDraft: {
    type: Boolean,
    default: false
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

// Index for customer_id and subDomain

// Update the updatedAt field before saving
webSettingsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const MainWebSettings = mongoose.model('mainWebSettings', webSettingsSchema);

module.exports = MainWebSettings;