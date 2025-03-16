const dotenv = require("dotenv");
dotenv.config();

const getChatbotResponse = async (req, res) => {
    const OpenAI = (await import("openai")).default; //dynamic import workaround for cjs to ESM
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const { message } = req.body;

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ message: 'OpenAI API key not found' });
    }

    const systemPrompt = `
    You are a gardening assistant. If a user provides a location (city, state, or country),
    infer the most common soil type for that area based on your knowledge. Otherwise, answer 
    general gardening questions.
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            max_tokens: 999,
            temperature: 0.7
        });

        if (!completion.choices || !completion.choices.length === 0) {
            console.error("OpenAI returned an unexpected response:", completion);
            throw new Error("Invalid response from OpenAI");
        }

        const chatbotMessage = completion.choices[0]?.message?.content || "I couldn't process your request.";

        res.json({ response: chatbotMessage });

        } catch (error) {
        console.error("OpenAI chatbot Error:", error);

        // Error message
        res.status(500).json({
            response: "Sorry, I couldn't process your request. Please try again later.",
            error: error.message, // Error details for debugging
        });
    }
};

module.exports = { getChatbotResponse };
