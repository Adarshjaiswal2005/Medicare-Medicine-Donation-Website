const mongoose = require('mongoose');
const RequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  medicine: { type: String, required: true },
  quantity: { type: Number, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: 'pending' }, // 'pending', 'approved', 'rejected'
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Request', RequestSchema);