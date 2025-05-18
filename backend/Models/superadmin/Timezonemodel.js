const mongoose=require("mongoose");

const timezoneschema = new mongoose.Schema({
  timezoneName: {
    type: String,
    required: [true, 'timezone is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required']
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
timezoneschema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Timezonemodel = mongoose.model('Timezone', timezoneschema);

module.exports=Timezonemodel;