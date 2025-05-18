const mongoose = require('mongoose');

const CostPlanSchema = new mongoose.Schema({
  Pages: {
    type: Map,
    of: String
  },
  Contents: {
    type: Map,
    of: String
  },
  Products: {
    type: Map,
    of: String
  },
  UploadLibrary: {
    type: Map,
    of: String
  },
  Appearance: {
    type: Map,
    of: String
  },
  Setting: {
    type: Map,
    of: String
  },
  Users: {
    type: Map,
    of: String
  },
  SupportTicket: {
    type: Map,
    of: String
  },
}, { timestamps: true });

const Creditmodel= mongoose.model('CostPlan', CostPlanSchema);
module.exports =Creditmodel;
