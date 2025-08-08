import axios from 'axios';

// API Base URL - environment aware
const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints
const endpoints = {
  menu: '/menu',
  menuByCategory: (category) => `/menu?category=${category}`,
  login: '/login',
  orders: '/order',
  health: '/health',
};

// API service functions
export const apiService = {
  // Health check
  checkHealth: () => api.get(endpoints.health),
  
  // Menu operations
  getMenu: () => api.get(endpoints.menu),
  getMenuByCategory: (category) => api.get(endpoints.menuByCategory(category)),
  
  // Authentication
  login: (credentials) => api.post(endpoints.login, credentials),
  
  // Orders
  createOrder: (orderData) => api.post(endpoints.orders, orderData),
  getOrders: () => api.get(endpoints.orders),
  
  // Auth helpers
  setAuthToken: (token) => {
    localStorage.setItem('authToken', token);
  },
  
  getAuthToken: () => {
    return localStorage.getItem('authToken');
  },
  
  clearAuthToken: () => {
    localStorage.removeItem('authToken');
  },
  
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
};

export default apiService;
