const express = require('express');
const {
  registerUser,
  loginUser,
  getProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// GET /api/auth/profile
router.get('/profile', protect, getProfile);

module.exports = router;
