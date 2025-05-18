const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountType: {
    type: String,
    enum: ['Fixed', 'Percentage'],
    required: true,
  },
  couponAmount: {
    type: Number,
    required: true,
  },
  allowFreeShipping: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  minSpend: {
    type: Number,
    default: 0,
  },
  maxSpend: {
    type: Number,
    default: 0,
  },
  individualUseOnly: {
    type: Boolean,
    default: false,
  },
  excludeSaleItems: {
    type: Boolean,
    default: false,
  },
  usageLimitPerCoupon: {
    type: Number,
    default: 0,
  },
  usageLimitPer:{
    type: Number,
    default: 0,
  },
  usageLimitPerDay: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Publish', 'Password', 'Private', 'Draft'],
    default: 'Publish',
  },
  visibility: {
    type: String,
    enum: ['Approved', 'Pending', 'Rejected'],
    default: 'Approved',
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    default: '',
  },
  packages: {
    type: [String],
    default: [],
  },
  excludePackages: {
    type: [String],
    default: [],
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
  authorizedBy: {
    type:String,
    ref: 'Admin',
    required: true
  },
  authorizedDate: {
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
    enum: ['Publish','Password','Private','Draft'],
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
}, { timestamps: true });

const Couponmodel = mongoose.model('Coupon', couponSchema);

module.exports = Couponmodel;