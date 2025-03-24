const dotenv = require("dotenv");
dotenv.config();

const getCustomizeResponse = async (req, res) => {
  const OpenAI = (await import("openai")).default;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const { plant, zone } = req.body;

  if (!plant || !zone) {
    return res.status(400).json({ message: "Plant and zone are required." });
  }

  const prompt = `
    You are a gardening assistant. Provide step-by-step instructions for growing "${plant}" in USDA hardiness zone "${zone}".
    Respond in JSON format with the following structure:
    {
      "soilPreparation": ["Step 1: Do this.", "Step 2: Do that."],
      "wateringSchedule": ["Step 1: Water this way.", "Step 2: Adjust for this condition."],
      "sunlightRequirements": ["Step 1: Ensure this amount of sunlight.", "Step 2: Avoid this condition."],
      "plantingInstructions": ["Step 1: Prepare the soil.", "Step 2: Plant the seeds."],
      "maintenanceTips": ["Step 1: Check for pests.", "Step 2: Prune regularly."],
      "companionPlants": ["Plant 1", "Plant 2", "Plant 3"]
    }
    Ensure each section contains clear, concise, and beginner-friendly steps formatted as an array of strings.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 700,
      temperature: 0.7,
    });

    const aiResponse =
      completion.choices[0]?.message?.content ||
      "I couldn't generate instructions. Please try again.";

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({
      response: "Failed to generate instructions. Please try again later.",
    });
  }
};

module.exports = { getCustomizeResponse };
