// API Configuration
const API_CONFIG = {
    // Automatically detect if we're on localhost or production
    BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:5500' 
        : window.location.origin, // Use current domain for production
    
    // API endpoints
    ENDPOINTS: {
        REGISTER: '/api/register',
        LOGIN: '/api/login',
        DONATE: '/api/donate',
        DONATE_MONEY: '/api/donate-money',
        REQUEST: '/api/request',
        REQUESTS: '/api/requests',
        USER_PROFILE: '/api/user/profile',
        USER_UPDATE: '/api/user/update',
        USER_DELETE: '/api/user/delete',
        CHANGE_PASSWORD: '/api/user/change-password',
        MEDICINES_SEARCH: '/api/medicines/search',
        MEDICINES_ALL: '/api/medicines/all',
        DONATIONS_COUNT: '/api/donations/count',
        MONEY_DONATIONS_COUNT: '/api/money-donations/count',
        MONEY_DONATIONS_TOTAL: '/api/money-donations/total',
        ADMIN_STATS: '/api/admin/stats',
        ADMIN_USERS: '/api/admin/users',
        ADMIN_DONATIONS: '/api/admin/donations',
        ADMIN_MONEY_DONATIONS: '/api/admin/money-donations',
        ADMIN_REQUESTS: '/api/admin/requests'
    }
};

// Helper function to get full API URL
function getApiUrl(endpoint) {
    return API_CONFIG.BASE_URL + endpoint;
}

console.log('API Base URL:', API_CONFIG.BASE_URL);
