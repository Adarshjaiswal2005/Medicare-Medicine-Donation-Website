const mongoose = require('mongoose');

const MoneyDonationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, // 'card', 'upi', 'qr'
  address: { type: String, required: true },
  message: String,
  paymentStatus: { type: String, default: 'pending' }, // 'pending', 'completed', 'failed'
  transactionId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoneyDonation', MoneyDonationSchema); 