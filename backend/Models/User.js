const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id:{
    type: String,
    required: true,
  },
  profile_pic:{
    type:String,
    default:"https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-14.webp"
  },
    registration_type:{
       type: String,
         required: true,
            enum: ['phone', 'email'],
    },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  uploadedImages: {
    type: [String],  // Array of strings to store image URLs or paths
    default: [],
  },
  otp: {
    type: String,  // Store OTP as a string (6-digit code, for example)
    required: false,
  },
  otpExpiry: {
    type: Date, // Store expiry time of OTP
    required: false,
  },
  verified:{
    type:Boolean,
    default:false
  },
   // Organization Details
   organizationName: {
    type: String,
    default:"",
    trim: true
  },
  organizationPhone: {
    type: String,
    default:"",
    trim: true
  },
  organizationEmail: {
    type: String,
    trim: true,
    default:"",
    lowercase: true
  },
  organizationAddress: {
    type: String,
    default:"",
    trim: true
  },
  city: {
    type: String,
    default:"",
    trim: true
  },
  postCode: {
    type: String,
    default:"",
    trim: true
  },
  stateCountry: {
    type: String,
    default:"",
    trim: true
  },
  countryRegion: {
    type: String,
    default:"",
    trim: true
  },
  
  // Language and Time Settings
  organizationAddress: {
    type: String,
    default:"",
    trim: true
  },
  // Domain Settings
  subDomain: {
    type: String,
    default:"",
    trim: true,
    lowercase: true
  },
  selectedPackagename:{
    type: String,
  },
    // New: Selected Package Info
    // selectedPackage: {
    //   name: {
    //     type: String,
    //     enum: ['Free Plan', 'Starter Plan', 'Advance Plan', 'Premium Plan'],
    //     required: false,
    //   },
    //   credits: {
    //     type: Number,
    //     required: false,
    //   },
    //   librarySizeMB: {
    //     type: Number,
    //     required: false,
    //   },
    //   trafficMB: {
    //     type: Number,
    //     required: false,
    //   },
    //   price: {
    //     type: Number,
    //     required: false,
    //   },
    //   purchaseDate: {
    //     type: Date,
    //     default: Date.now,
    //   }
    // },
    selectedPackage: {
      name: {
        type: String,
        required: false,
      },
      credits: Number,
      librarySizeMB: Number,
      trafficMB: Number,
      price: Number,
      purchaseDate: {
        type: Date,
        default: Date.now,
      },
      technology: String,
      support: String,
      active_package:{
        type:Boolean,
        default:false
      },
    },    
    // New: User's available credit balance (to buy things)
    availableCredits: {
      type: Number,
      default: 0,
    },
    selectedDuration: {
      years: {
        type: Number,
        default: 0
      },
      months: {
        type: Number,
        default: 1
      }
    },
    selectedTotalPrice: {
      type: Number,
      default: 0
    },
      // ✅ Additional fields:
  createdBy: {
    type: String,
    required: false,
    default:"N/A"
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  authorizedBy: {
    type: String,
    default:"N/A"
  },
  authorizedDate: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  category:{
    type: String,
  },
  authorizationVisibility: {
    type: Boolean,
    default: false,
  },
  autoInvoice: {
    type: String,
    enum: ['Active', 'Deactive'],
    default: 'Active',
  },
  authorized: {
    type: String,
    enum: ['Approved', 'Pending',"Rejected"],
    default: 'Approved',
  },
  visibility: {
    type: String,
    enum: ['Publish', 'Draft'],
    default: 'Publish',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  updatedBy: {
    type: String,
    default:"N/A"
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  totalstorage:{
    type:Number,
    default:0,
  },
  imagessize:{
    type:Number,
    default:0,
  },
  documentssize:{
    type:Number,
    default:0,
  },  
  audiosize:{
    type:Number,
    default:0,
  },
}, {
  timestamps: true
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
