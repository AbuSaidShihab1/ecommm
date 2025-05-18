const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // reference to the User model
    required: true,
  },
   title: {
    type: String,
  },
   description: {
    type: String,
  },
     alt_text: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  file_name:{
    type: String,
    required: true,
  },
  size:{
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  author: {
    type:String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  authorizedBy: {
    type:String,
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true,
});

const ImageModel = mongoose.model('images', ImageSchema);
module.exports = ImageModel;
