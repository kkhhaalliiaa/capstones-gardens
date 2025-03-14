const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const api = axios.create({
  baseURL: "https://permapeople.org/api/search",
  headers: {
    "x-permapeople-key-id": process.env.API_KEY,
    "x-permapeople-key-secret": process.env.API_SECRET,
  },
});

const searchPlants = async (query) => {
  try {
    console.log("Searching for plants with query:", query);
    const response = await api.post("", null, {
      params: {
        q: query,
      },
    });
    // console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching plant data:", error);
    return null;
  }
};

module.exports = searchPlants;
