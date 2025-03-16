const express = require("express");
const { getChatbotResponse } = require("../controllers/chatbotController.cjs");

const router = express.Router();

router.post("/chatbot", getChatbotResponse);

module.exports = router;