const mongoose = require('mongoose');
const DonationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: { type: String, required: true },
  medicine: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiry: { type: String, required: true },
  address: { type: String, required: true },
  // Link to the request this donation fulfills (if any)
  relatedRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  requestedBy: {
    name: String,
    email: String
  },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Donation', DonationSchema);