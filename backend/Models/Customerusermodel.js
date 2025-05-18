const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [4, 'Username must be at least 4 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10,15}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  profileImage: {
    type: String,
    default: 'https://i.ibb.co.com/HBsfNMb/avatar.jpg',
    validate: {
      validator: function(v) {
        return v !== 'https://i.ibb.co.com/HBsfNMb/avatar.jpg';
      },
      message: 'Profile image is required'
    }
  },
  accessLevel: {
    type: String,
    enum: ['Administration', 'Sales Manager', 'Marketing Manager', 'custom'],
    required: [true, 'Access level is required']
  },
  customPermissions: {
    type: mongoose.Schema.Types.Mixed,
    required: function() {
      return this.accessLevel === 'custom';
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
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
  lastActive: {
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
    default: Date.now,
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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// Update timestamp on update
userSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Customeruser = mongoose.model('Customer_User', userSchema);

module.exports = Customeruser;