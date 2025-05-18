// models/UserRole.js
const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  view_own: { type: Boolean, default: false },
  edit_own: { type: Boolean, default: false },
  delete_own: { type: Boolean, default: false },
  view_other: { type: Boolean, default: false },
  edit_other: { type: Boolean, default: false },
  delete_other: { type: Boolean, default: false }
});

const userRoleSchema = new mongoose.Schema({
  roleName: { 
    type: String, 
    required: [true, 'Role name is required'],
    trim: true,
    unique: true
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true
  },
  permissions: {
    type: Map,
    of: permissionSchema,
    default: {}
  },
    // ✅ Additional fields:
    createdBy: {
        type: String,
        required: false,
      },
      createdDate: {
        type: Date,
        default: Date.now,
      },
      authorizedBy: {
        type: String,
        required: false,
      },
      authorizedDate: {
        type: Date,
        default: Date.now,
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
      
      updatedBy: {
        type:String,
        default:"N/A",
      },
      updatedDate: {
        type: Date,
        default: Date.now
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
userRoleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UserRole', userRoleSchema);