require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const setupRoutes = require('./routes/setupRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initializeDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from parent directory (frontend)
const frontendPath = path.join(__dirname, '../../');
app.use(express.static(frontendPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/setup', setupRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  - POST /api/auth/register - Register new user`);
  console.log(`  - POST /api/auth/login - Login`);
  console.log(`  - GET  /api/auth/profile - Get user profile (requires auth)`);
  console.log(`  - GET  /api/users - Get all users (admin only)`);
  console.log(`  - GET  /api/users/:id - Get user by ID (admin only)`);
  console.log(`  - PUT  /api/users/:id - Update user (admin only)`);
  console.log(`  - DELETE /api/users/:id - Delete user (admin only)`);
});
