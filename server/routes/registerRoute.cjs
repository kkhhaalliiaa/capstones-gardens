const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController.cjs');

router.post('/', registerController.handleRegister);

module.exports = router;