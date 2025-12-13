// Authentication utilities
// Use relative URL in production, localhost in development
const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api'
  : '/api';

class AuthManager {
  constructor() {
    this.token = localStorage.getItem('authToken');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  async register(username, email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      this.setAuth(data.token, data.user);
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(username, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      this.setAuth(data.token, data.user);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getProfile() {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile');
      }

      return data;
    } catch (error) {
      console.error('Profile error:', error);
      throw error;
    }
  }

  setAuth(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/index.html';
  }

  isAuthenticated() {
    return !!this.token;
  }

  isAdmin() {
    return this.user && this.user.role === 'admin';
  }

  requireAuth(redirectUrl = '/login.html') {
    if (!this.isAuthenticated()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  }

  requireAdmin(redirectUrl = '/index.html') {
    if (!this.isAdmin()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  }
}

// Create global instance
const auth = new AuthManager();
