const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.cjs');

// Routes
router.get('/', userController.getAllUsers); // Get all users
router.get('/:id',  userController.getUserById); // Get one user
router.delete('/:id',   userController.deleteUser); // Delete user
router.put('/update-password/:id', userController.updatePassword); // Update password

module.exports = router;
