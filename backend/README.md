# MediCare - Healthcare Donation Platform

## 🏥 Project Overview

MediCare is a comprehensive healthcare donation platform that connects donors with those in need. The platform facilitates both medicine donations and monetary contributions to support healthcare initiatives.

## ✨ Features

### 🏠 Main Website (`index.html`)
- **Responsive Design**: Modern, mobile-friendly interface
- **Dark Mode Toggle**: User preference for light/dark themes
- **Animated Elements**: AOS (Animate On Scroll) animations
- **Features Section**: 5 key features including medicine and money donations
- **About Section**: Mission and vision information
- **Contact Information**: Multiple ways to reach the organization

### 💊 Medicine Donation (`donate.html`)
- **Donation Form**: Collect medicine details, donor information, and pickup preferences
- **Medicine Categories**: Organized by type and condition
- **Location Services**: City-based pickup coordination
- **WhatsApp Integration**: Direct contact for donation coordination
- **Monetary Donation Promotion**: Encourages monetary contributions as alternative

### 💰 Money Donation (`donate-money.html`)
- **Flexible Amount Selection**: Pre-set amounts (₹100, ₹500, ₹1,000) + custom amounts
- **Multiple Payment Methods**:
  - **Credit/Debit Cards**: Secure card payment form
  - **UPI Payments**: Direct UPI ID integration (`sumangupta1280-1@oksbi`)
  - **QR Code Payments**: QR code scanning with download option
- **Payment Modal**: Professional payment interface
- **MongoDB Integration**: Real-time data storage
- **FAQs Section**: 10 comprehensive questions with attractive design
- **Impact Tracking**: Real-time donation statistics

### 📞 Contact System (`contact.html`)
- **Contact Form**: Name, email, and message fields
- **WhatsApp Integration**: Pre-filled messages sent directly to WhatsApp
- **Form Validation**: Ensures required fields are completed
- **Auto-formatting**: Professional message formatting

### 🔐 User Authentication (`login.html`)
- **Login/Register System**: User account management
- **Dark Mode Support**: Consistent theme across pages
- **Session Management**: Local storage for user sessions
- **Profile Navigation**: Dynamic menu based on login status

### 📋 Medicine Requests (`request.html`)
- **Request Form**: For those seeking medicine donations
- **Category Selection**: Specific medicine requirements
- **Location Details**: City and address information
- **Contact Information**: Phone and email for coordination

### ℹ️ About Page (`about.html`)
- **Organization Information**: Mission, vision, and values
- **Team Details**: Key personnel information
- **Achievement Highlights**: Impact statistics and milestones

## 🛠️ Technical Stack

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with animations
- **JavaScript**: Interactive functionality
- **Bootstrap 5.3.2**: Responsive framework
- **Bootstrap Icons**: Professional iconography
- **AOS Library**: Scroll animations

### Backend
- **Node.js**: Server runtime environment
- **Express.js**: Web application framework
- **MongoDB Atlas**: Cloud database
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **bcryptjs**: Password hashing

## 📁 Project Structure

```
medicare/
├── index.html              # Main landing page
├── donate.html             # Medicine donation page
├── donate-money.html       # Money donation page
├── contact.html            # Contact page
├── login.html              # Authentication page
├── request.html            # Medicine request page
├── about.html              # About page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── script.js          # Main JavaScript
├── backend/
│   ├── server.js          # Express server
│   ├── User.js            # User model
│   ├── Donation.js        # Medicine donation model
│   ├── MoneyDonation.js   # Money donation model
│   ├── Request.js         # Medicine request model
│   ├── package.json       # Dependencies
│   ├── env.example        # Environment template
│   └── README.md          # This file
├── sc.jpg                 # QR code image
├── ajay-yadav.jpg         # Team member image
└── your-image.jpg         # Additional image
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Code editor (VS Code recommended)

### Step 1: Clone/Download Project
```bash
# If using git
git clone <repository-url>
cd medicare

# Or download and extract the project folder
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies
```bash
cd backend
npm install
```

#### 2.2 MongoDB Atlas Configuration
1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (M0 Free tier recommended)

2. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Configure Environment Variables**:
   ```bash
   # Create .env file in backend folder
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/medicare?retryWrites=true&w=majority
   PORT=5500
   ```

#### 2.3 Start Backend Server
```bash
npm start
# or
node server.js
```

Server will run on `http://localhost:5500`

### Step 3: Frontend Setup

#### 3.1 Serve Frontend Files
You can use any local server:

**Using Python**:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js**:
```bash
npx http-server -p 8000
```

**Using Live Server (VS Code Extension)**:
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

#### 3.2 Access Website
Open your browser and go to:
- **Frontend**: `http://localhost:8000`
- **Backend API**: `http://localhost:5500`

## 📊 Database Models

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}
```

### Medicine Donation Model
```javascript
{
  donorName: String,
  donorEmail: String,
  donorPhone: String,
  medicineName: String,
  category: String,
  quantity: Number,
  expiryDate: Date,
  condition: String,
  city: String,
  address: String,
  pickupPreference: String,
  additionalInfo: String,
  createdAt: Date
}
```

### Money Donation Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  amount: Number,
  paymentMethod: String, // 'card', 'upi', 'qr'
  address: String,
  message: String,
  paymentStatus: String, // 'pending', 'completed', 'failed'
  transactionId: String,
  createdAt: Date
}
```

### Medicine Request Model
```javascript
{
  requesterName: String,
  requesterEmail: String,
  requesterPhone: String,
  medicineName: String,
  category: String,
  quantity: Number,
  urgency: String,
  city: String,
  address: String,
  additionalInfo: String,
  createdAt: Date
}
```

## 🔌 API Endpoints

### User Management
- `POST /api/register` - User registration
- `POST /api/login` - User authentication

### Medicine Donations
- `POST /api/donations` - Create new donation
- `GET /api/donations` - Get all donations
- `GET /api/donations/count` - Get donation count

### Money Donations
- `POST /api/donate-money` - Create money donation
- `GET /api/money-donations/count` - Get money donation count
- `GET /api/money-donations/total` - Get total amount raised

### Medicine Requests
- `POST /api/requests` - Create new request
- `GET /api/requests` - Get all requests
- `GET /api/requests/count` - Get request count

## 🧪 Testing the Integration

### Test Money Donation Flow
1. Open `donate-money.html`
2. Fill the donation form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - City: Test City
   - Purpose: Testing
   - Amount: ₹100
3. Click "Donate Now"
4. Choose payment method (UPI/QR/Card)
5. Complete payment
6. Check MongoDB Atlas for new document in `moneydonations` collection

### Test Medicine Donation Flow
1. Open `donate.html`
2. Fill the medicine donation form
3. Submit the form
4. Check MongoDB Atlas for new document in `donations` collection

### Test Contact Form
1. Open `contact.html`
2. Fill the WhatsApp contact form
3. Submit - should open WhatsApp with pre-filled message

## 🎨 Customization

### Payment Details
- **UPI ID**: Update in `donate-money.html` (currently: `sumangupta1280-1@oksbi`)
- **QR Code**: Replace `sc.jpg` with your QR code image
- **WhatsApp Number**: Update in `contact.html` (currently: 918104073670)

### Styling
- Main styles: `css/style.css`
- Bootstrap customization: Override Bootstrap classes
- Dark mode: Toggle with JavaScript function

### Content
- Update organization details in `about.html`
- Modify FAQs in `donate-money.html`
- Change impact numbers in donation pages

## 🔧 Troubleshooting

### Common Issues

**Backend won't start**:
- Check if port 5500 is available
- Verify MongoDB connection string
- Ensure all dependencies are installed

**Frontend not loading**:
- Check if local server is running
- Verify file paths are correct
- Clear browser cache

**MongoDB connection failed**:
- Verify connection string format
- Check network connectivity
- Ensure MongoDB Atlas IP whitelist includes your IP

**Payment form not working**:
- Check browser console for errors
- Verify backend server is running
- Check API endpoint URLs

### Error Messages
- **"MongoDB connection failed"**: Check connection string and network
- **"Port already in use"**: Change PORT in .env file
- **"Module not found"**: Run `npm install` in backend folder

## 📈 Future Enhancements

### Planned Features
- [ ] Email notifications for donations
- [ ] Admin dashboard for donation management
- [ ] Real-time chat support
- [ ] Mobile app development
- [ ] Payment gateway integration (Razorpay/PayU)
- [ ] Donation tracking system
- [ ] Impact stories and testimonials
- [ ] Multi-language support

### Technical Improvements
- [ ] JWT authentication
- [ ] Password reset functionality
- [ ] Image upload for medicine photos
- [ ] Search and filter functionality
- [ ] Pagination for large datasets
- [ ] API rate limiting
- [ ] Data validation middleware

## 📞 Support

For technical support or questions:
- **Email**: [Your email]
- **WhatsApp**: +91 8104073670
- **GitHub Issues**: [Repository issues page]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Bootstrap team for the responsive framework
- MongoDB Atlas for cloud database services
- AOS library for scroll animations
- All contributors and donors to the MediCare platform

---

**Last Updated**: December 2024
**Version**: 1.0.0 