const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// All user routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
