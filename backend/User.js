const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  password: String, // Optional for users who register without password
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);