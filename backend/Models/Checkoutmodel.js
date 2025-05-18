// models/Checkout.js
const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  profile_pic:{
    type:String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  invoiceId: {
    type: String,
    required: true,
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  reference: {
    type: String,
    default:"N/A"
  },
  firstName: String,
  lastName: String,
  email: String,
  company: String,
  phone: String,
  address1: String,
  address2: String,
  city: String,
  zip: String,
  state: String,
  country: String,
  saveInfo: {
    type: Boolean,
    default: false,
  },
  selectedPlan: {
    type: Object, // You can create a separate Plan schema if needed
    default: {},
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalMonths: {
    type: Number,
    default: 1,
  },
  totaldiscount: {
    type: Number,
    default: 0,
  },
  walletDetails: {
    accountNumber: String,
    transactionId: String,
    paymentMethod: String,
    agentNumber: String,
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
  payment: {
    type: String,
    enum: ['Paid', 'Unpain'],
    default: 'Unpaid'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
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

const CheckoutModel = mongoose.model("Checkout", checkoutSchema);
module.exports = CheckoutModel;
