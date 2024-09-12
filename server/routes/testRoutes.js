const express = require('express');
const { createTest, getAllTests } = require('../controllers/testController');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

// Create test
router.post('/', authMiddleware, createTest);

// Get all tests
router.get('/', getAllTests);

module.exports = router;