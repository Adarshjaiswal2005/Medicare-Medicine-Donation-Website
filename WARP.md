# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Medicare is a full-stack healthcare donation platform that connects medicine donors with those in need. The platform features both physical medicine donations and monetary contributions, with a complete user authentication system and admin dashboard.

## Development Commands

### Backend Development
```bash
# Install backend dependencies
cd backend && npm install

# Start backend server (development)
cd backend && npm start
# Server runs on http://localhost:5500

# Start backend with node directly
cd backend && node server.js
```

### Frontend Development
```bash
# Serve frontend files (multiple options)
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Using Live Server (VS Code extension recommended)
# Right-click index.html -> "Open with Live Server"
```

### Environment Setup
```bash
# Create environment file from template
cd backend && cp env.example .env

# Edit .env with your MongoDB Atlas connection string
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/medicare
# PORT=5500
```

### Database Operations
```bash
# The application uses MongoDB Atlas
# No local database setup required
# Models are auto-created on first document insertion
```

## Architecture Overview

### Frontend Structure (Static Files)
- **Multi-page application** with individual HTML files for each feature
- **Bootstrap 5.3.2** for responsive UI framework
- **Vanilla JavaScript** with modern ES6+ features for interactivity
- **AOS (Animate On Scroll)** for animations
- **Dark mode toggle** with localStorage persistence

### Backend Architecture (Node.js/Express)
- **RESTful API** design with clear endpoint separation
- **MongoDB/Mongoose** for data persistence with 4 main models
- **bcryptjs** for password hashing and user authentication
- **CORS enabled** for frontend-backend communication
- **Environment-based configuration** for deployment flexibility

### Key Models
1. **User**: Authentication, profile management, account operations
2. **Donation**: Medicine donations with categories, quantities, expiry dates
3. **MoneyDonation**: Monetary contributions with payment method tracking
4. **Request**: Medicine requests from those in need

### API Architecture
- **User Management**: `/api/register`, `/api/login`, `/api/user/*`
- **Medicine Donations**: `/api/donate`, `/api/donations/*`, `/api/medicines/*`
- **Money Donations**: `/api/donate-money`, `/api/money-donations/*`
- **Medicine Requests**: `/api/request`, `/api/requests/*`
- **Admin Dashboard**: `/api/admin/*` for user/donation management

### Frontend-Backend Integration
- **AJAX requests** using fetch() API for all server communication
- **LocalStorage** for user session management and dark mode preferences
- **Dynamic content rendering** based on API responses
- **Form validation** both client-side and server-side

### Payment Integration
- **Multiple payment methods**: UPI, QR codes, credit/debit cards
- **UPI ID integration**: Direct payment to `sumangupta1280-1@oksbi`
- **WhatsApp integration**: Contact form sends pre-formatted messages
- **Payment status tracking** in MongoDB for donation management

## Key Development Patterns

### Error Handling
All API endpoints use consistent try-catch blocks with proper HTTP status codes and descriptive error messages.

### Data Validation
Server-side validation for all user inputs with Mongoose schema validation and custom business logic.

### Security
- Password hashing with bcryptjs (10 salt rounds)
- Input sanitization through Mongoose schemas
- CORS configuration for secure cross-origin requests

### Code Organization
- **Separation of concerns**: Models in separate files, single server.js for routes
- **RESTful conventions**: HTTP methods match operations (GET, POST, PUT, DELETE)
- **Consistent naming**: camelCase for JavaScript, lowercase for database fields

## Development Workflow

### Local Development
1. Start MongoDB Atlas connection (cloud-based)
2. Run backend server on port 5500
3. Serve frontend on port 8000 (or use Live Server)
4. Test full-stack integration through browser

### Deployment (Render)
- Uses root-level `package.json` for platform detection
- Environment variables configured in Render dashboard
- Automatic build: `npm install && cd backend && npm install`
- Start command: `npm start` (runs `node backend/server.js`)

### Testing Integration
Test critical flows:
- User registration/login cycle
- Medicine donation submission and admin dashboard viewing
- Money donation with payment method selection
- Medicine request submission and search functionality
- WhatsApp contact form integration

## File Structure Significance

- **Frontend pages**: Each HTML file represents a complete user flow
- **Backend models**: Individual files for each data entity with Mongoose schemas
- **Static assets**: Images stored in root, styles in `/css`, scripts in `/js`
- **Configuration**: Environment variables in backend, no build process required
