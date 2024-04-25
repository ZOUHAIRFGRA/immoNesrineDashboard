const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Routes
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);

module.exports = router;
