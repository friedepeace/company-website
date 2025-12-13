const User = require('../models/User');

async function getAllUsers(req, res) {
  try {
    const users = User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function getUserById(req, res) {
  try {
    const user = User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

async function updateUser(req, res) {
  try {
    const { username, email, password, role } = req.body;
    const updates = {};

    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) updates.password = password;
    if (role) updates.role = role;

    User.update(req.params.id, updates);

    const updatedUser = User.findById(req.params.id);
    res.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

async function deleteUser(req, res) {
  try {
    User.delete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
