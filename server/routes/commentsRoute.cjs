const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController.cjs");

// Routes
router.get("/", commentsController.getMessages); // Get all messages
router.post("/", commentsController.createMessage); // Create a message
router.delete("/:id", commentsController.deleteMessage); // Delete a message

module.exports = router;
