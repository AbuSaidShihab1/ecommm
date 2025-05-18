const mongoose = require('mongoose');

const pricePlanSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  note: {
    type: String,
    required: [true, 'Note is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: [0, 'Credits cannot be negative']
  },
  mediaSize: {
    type: String,
    required: [true, 'Media size is required'],
    trim: true
  },
  traffic: {
    type: String,
    required: [true, 'Traffic is required'],
    trim: true
  },
  technologies: {
    type: [String],
    default: []
  },
  supports: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  image: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createBy: {
    type:String,
    ref: 'Admin',
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  publishBy: {
    type:String,
    ref: 'Admin',
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  updateBy: {
    type:String,
    ref: 'Admin',
    default:"N/A"
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
  authorized: {
    type: String,
    enum: ['Approved', 'Pending',"Rejected"],
    default: 'Approved',
  },
  visibility: {
    type: String,
    enum: ['Publish','Private','Draft'],
    default: 'Publish',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
  },
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
pricePlanSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const PricePlanmodel = mongoose.model('PricePlan', pricePlanSchema);

module.exports = PricePlanmodel;
