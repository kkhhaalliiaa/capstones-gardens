const searchPlants = require("../utils/plantApi.cjs");

const listPlants = async (req, res) => {
  try {
    const query = req.query.q;
    console.log("Received query:", query);
    const plants = await searchPlants(query);
    res.json(plants);
  } catch (error) {
    console.error("Error in listPlants controller:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = listPlants;
