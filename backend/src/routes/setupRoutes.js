const express = require('express');
const User = require('../models/User');

const router = express.Router();

// One-time setup endpoint to make a user admin
// This should be disabled after first use
router.post('/make-admin', async (req, res) => {
  try {
    const { username, secret } = req.body;

    // Simple secret check - change this to a random string
    const SETUP_SECRET = process.env.SETUP_SECRET || 'change-me-to-random-string';

    if (secret !== SETUP_SECRET) {
      return res.status(403).json({ error: 'Invalid secret' });
    }

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const user = User.findByUsername(username);

    if (!user) {
      return res.status(404).json({ error: `User "${username}" not found` });
    }

    if (user.role === 'admin') {
      return res.json({
        message: `User "${username}" is already an admin`,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    }

    // Make user admin
    User.update(user.id, { role: 'admin' });

    res.json({
      message: `User "${username}" is now an admin!`,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Make admin error:', error);
    res.status(500).json({ error: 'Failed to make user admin' });
  }
});

module.exports = router;
