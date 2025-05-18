const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  reply_id: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  attachments: {
    type: [String],
    default: []
  },
  repliedBy: {
    type: String,
    ref: 'Admin',
    required: true
  },
  repliedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: String,
    ref: 'Admin',
    default: "N/A"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isAdminReply: {
    type: Boolean,
    default: true
  }
});

const ticketSchema = new mongoose.Schema({
  ticket_id: {
    type: String,
    required: true
  },
  profile_pic: {
    type: String,
  },
  accountHolder: {
    type: String,
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  attachments: {
    type: [String],
    default: []
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    ref: 'Admin',
    required: true
  },
  authorizedBy: {
    type: String,
    ref: 'Admin',
    required: true
  },
  authorizedDate: {
    type: Date,
    default: Date.now
  },
  updateBy: {
    type: String,
    ref: 'Admin',
    default: "N/A"
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Waiting', 'Replied'],
    default: 'Waiting'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  replies: {
    type: [replySchema],
    default: []
  },
  lastReply: {
    type: Date,
    default: null
  }
});

// Update the updatedAt field before saving
ticketSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Update lastReply if new replies were added
  if (this.isModified('replies') && this.replies.length > 0) {
    this.lastReply = Date.now();
    
    // Update status to 'Replied' if it's not closed
    if (this.status !== 'Closed') {
      this.status = 'Replied';
    }
  }
  
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports=Ticket;