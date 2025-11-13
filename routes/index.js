const express = require('express');
const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);

module.exports = router;
