const mongoose=require("mongoose");

const countrySchema = new mongoose.Schema({
  countryName: {
    type: String,
    required: [true, 'Country name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type:String,
    ref: 'Admin',
    required: true
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
});

// Update the updatedAt field before saving
countrySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Countrymodel = mongoose.model('Country', countrySchema);

module.exports=Countrymodel;