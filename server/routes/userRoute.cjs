const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.cjs");
const {
  verifyToken,
  isAdmin,
  isSelfOrAdmin,
} = require("../middleware/authMiddleware.cjs");

// Routes
router.get("/", userController.getAllUsers); // Ensure this route is accessible
router.get("/:id", verifyToken, isSelfOrAdmin, userController.getUserById); // Self or Admin: Get one user
router.delete("/:id", verifyToken, isSelfOrAdmin, userController.deleteUser); // Self or Admin: Delete user
router.put(
  "/update-password/:id",
  verifyToken,
  isSelfOrAdmin,
  userController.updatePassword
); // Self or Admin: Update password

module.exports = router;
