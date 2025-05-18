const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Category name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`
    }
  },
  permissions: {
    type: Map,
    of: Boolean,
    default: {}
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

// Update the updatedAt field before saving
categorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Text index for search functionality
categorySchema.index({ name: 'text', description: 'text' });
const Categorymodel=mongoose.model('Category', categorySchema);
module.exports = Categorymodel;