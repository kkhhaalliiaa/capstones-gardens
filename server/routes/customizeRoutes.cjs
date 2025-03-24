const express = require("express");
const {
  getCustomizeResponse,
} = require("../controllers/customizeController.cjs");
const router = express.Router();

router.post("/customize", getCustomizeResponse);

module.exports = router;
