const express = require("express");
const listPlants = require("../controllers/plantController.cjs");

const router = express.Router();

router.get("/", listPlants);

module.exports = router;
