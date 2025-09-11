const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const Donation = require('./Donation');
const MoneyDonation = require('./MoneyDonation');

app.post('/api/donate', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({ message: 'Donation saved!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Money Donation Routes
app.post('/api/donate-money', async (req, res) => {
  try {
    const moneyDonation = new MoneyDonation(req.body);
    await moneyDonation.save();
    res.status(201).json({ 
      message: 'Money donation saved!', 
      donationId: moneyDonation._id 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get money donations count
app.get('/api/money-donations/count', async (req, res) => {
  try {
    const count = await MoneyDonation.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get total amount raised
app.get('/api/money-donations/total', async (req, res) => {
  try {
    const result = await MoneyDonation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const total = result.length > 0 ? result[0].total : 0;
    res.json({ total });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all donations count
app.get('/api/donations/count', async (req, res) => {
  try {
    const count = await Donation.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const Request = require('./Request');

app.post('/api/request', async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json({ message: 'Request saved!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Search medicines endpoint
app.get('/api/medicines/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Search in donations collection for available medicines
    const searchRegex = new RegExp(query, 'i'); // Case-insensitive search

    const medicines = await Donation.find({
      medicine: { $regex: searchRegex }
    }).select('medicine quantity expiry createdAt').sort({ createdAt: -1 });

    // Group by medicine name and aggregate quantities
    const medicineMap = new Map();

    medicines.forEach(med => {
      const medicineName = med.medicine.toLowerCase();
      if (medicineMap.has(medicineName)) {
        const existing = medicineMap.get(medicineName);
        existing.quantity += med.quantity;
        // Keep the latest expiry date
        if (new Date(med.expiry) > new Date(existing.expiry)) {
          existing.expiry = med.expiry;
        }
      } else {
        medicineMap.set(medicineName, {
          name: med.medicine,
          quantity: med.quantity,
          expiry: med.expiry,
          available: true
        });
      }
    });

    // Convert map to array
    const results = Array.from(medicineMap.values());

    res.json({
      success: true,
      count: results.length,
      medicines: results
    });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Debug endpoint to get all medicines
app.get('/api/medicines/all', async (req, res) => {
  try {
    const allDonations = await Donation.find({}).select('medicine quantity expiry createdAt name email').sort({ createdAt: -1 });
    res.json({
      success: true,
      count: allDonations.length,
      donations: allDonations
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const User = require('./User');
const bcrypt = require('bcryptjs');

// Register Route
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, mobile, address, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    let hashedPassword = null;
    if (password && password.trim() !== '') {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = new User({
      name,
      email,
      mobile,
      address,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Check if user has a password set
    if (!user.password) {
      return res.status(400).json({ error: 'This account was created without a password. Please contact support.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    // Send name and email in response
    res.json({ message: 'Login successful!', name: user.name, email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user profile data
app.get('/api/user/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Get user's donations
    const donations = await Donation.find({ email: email });
    
    // Get user's requests
    const requests = await Request.find({ email: email });
    
    // Get user's money donations
    const moneyDonations = await MoneyDonation.find({ email: email });
    
    // Calculate total money donated
    const totalMoneyDonated = moneyDonations.reduce((sum, donation) => {
      return donation.paymentStatus === 'completed' ? sum + donation.amount : sum;
    }, 0);

    res.json({
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address
      },
      donations: donations,
      requests: requests,
      moneyDonations: moneyDonations,
      totalMoneyDonated: totalMoneyDonated,
      stats: {
        totalDonations: donations.length,
        totalRequests: requests.length,
        totalMoneyDonations: moneyDonations.length,
        totalMoneyDonated: totalMoneyDonated
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user profile
app.put('/api/user/update', async (req, res) => {
  try {
    const { name, email, mobile, address } = req.body;
    
    // Find and update user
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { name, mobile, address },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ 
      message: 'Profile updated successfully!',
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        address: updatedUser.address
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user account
app.delete('/api/user/delete', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user first
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Delete user's donations
    await Donation.deleteMany({ email: email });
    
    // Delete user's requests
    await Request.deleteMany({ email: email });
    
    // Delete user's money donations
    await MoneyDonation.deleteMany({ email: email });
    
    // Delete user account
    await User.findOneAndDelete({ email: email });
    
    res.json({ 
      message: 'Account deleted successfully! All your data has been removed.'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Change password
app.put('/api/user/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    res.json({
      message: 'Password changed successfully!'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin Routes
// Get all users for admin
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all donations for admin
app.get('/api/admin/donations', async (req, res) => {
  try {
    const donations = await Donation.find({}).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all money donations for admin
app.get('/api/admin/money-donations', async (req, res) => {
  try {
    const moneyDonations = await MoneyDonation.find({}).sort({ createdAt: -1 });
    res.json(moneyDonations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all requests for admin
app.get('/api/admin/requests', async (req, res) => {
  try {
    const requests = await Request.find({}).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get admin dashboard statistics
app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonations = await Donation.countDocuments();
    const totalRequests = await Request.countDocuments();

    // Calculate total money donated
    const moneyDonationsResult = await MoneyDonation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalMoneyDonated = moneyDonationsResult.length > 0 ? moneyDonationsResult[0].total : 0;

    res.json({
      totalUsers,
      totalDonations,
      totalRequests,
      totalMoneyDonated,
      totalMoneyDonations: await MoneyDonation.countDocuments()
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user (admin only)
app.delete('/api/admin/user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find user first
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user's donations
    await Donation.deleteMany({ email: user.email });

    // Delete user's requests
    await Request.deleteMany({ email: user.email });

    // Delete user's money donations
    await MoneyDonation.deleteMany({ email: user.email });

    // Delete user account
    await User.findByIdAndDelete(id);

    res.json({
      message: 'User and all associated data deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update request status (admin only)
app.put('/api/admin/request/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Request.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({
      message: 'Request status updated successfully!',
      request: request
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// HTML Page Routes
app.get('/donate', (req, res) => {
  res.sendFile(path.join(__dirname, '../donate.html'));
});

app.get('/donate-money', (req, res) => {
  res.sendFile(path.join(__dirname, '../donate-money.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../contact.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});

app.get('/request', (req, res) => {
  res.sendFile(path.join(__dirname, '../request.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../about.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../profile.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, '../settings.html'));
});

app.get('/my-donations', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-donations.html'));
});

app.get('/my-requests', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-requests.html'));
});

app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin-login.html'));
});

app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin-dashboard.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 