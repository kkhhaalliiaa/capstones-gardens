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
    You are a highly specialized gardening assistant. You ONLY answer questions related to:
    - Determining the most common soil type based on a provided location (city, state, or country).
    - General gardening knowledge, including plant care, soil improvement, composting, and organic gardening.

    IMPORTANT RULES:
    - If a user asks for a soil type, analyze their location and provide the most likely soil type.
    - If a question is unrelated to gardening (e.g., politics, technology, finance, entertainment, personal advice), politely respond: 
        "I can only assist with gardening and soil-related questions."
    - Do NOT provide medical advice, personal opinions, or non-gardening responses.
    - Keep responses concise and informative.

    Example Responses:
    User 1: "I live in Charlotte, North Carolina. What is my soil type?"
    Assistant: "Charlotte, NC typically has clay-heavy soil with moderate drainage. Amending it with compost can improve quality."

    User 2: "What’s the best way to grow tomatoes?"
    Assistant: "Tomatoes thrive in well-drained, loamy soil with a pH of 6.0-6.8. Ensure they receive 6-8 hours of sunlight daily."

    User 3: "Who won the Super Bowl?"
    Assistant: "I can only assist with gardening and soil-related questions."

    User 4: "What is the meaning of life?"
    Assistant: "I specialize in gardening advice. Let me know if you have soil or plant care questions!"
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            max_tokens: 999,
            temperature: 0.5
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
