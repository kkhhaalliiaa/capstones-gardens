const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController.cjs');

router.post('/', loginController.handleLogin);

module.exports = router;
