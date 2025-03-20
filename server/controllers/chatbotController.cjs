const dotenv = require("dotenv");
dotenv.config();

const getChatbotResponse = async (req, res) => {
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const { message, chatHistory = [] } = req.body; //Accepts chat history from the frontend

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ message: 'OpenAI API key not found' });
    }

    const systemPrompt = `
    You are a highly specialized gardening assistant. You ONLY answer questions related to:
    - Determining the most common soil type based on a provided location (city, state, or country).
    - General gardening knowledge, including plant care, soil improvement, composting, and organic gardening.

    IMPORTANT RULES:
    - If the user has previously provided a location, remember it throughout the conversation.
    - If they ask about suitable plants and have given a location, use that location to provide recommendations.
    - If a question is unrelated to gardening (e.g., politics, finance, technology), politely refuse to answer.
    - Do NOT provide medical advice, personal opinions, or non-gardening responses.
    - **Always format lists properly** using bullet points
    - **Use Markdown for bold text** to highlight plant categories.
    - **Separate different plant types** with a clear break for better readability.
    - Keep responses concise and informative.

    Example Responses:
    User 1: "I live in Charlotte, North Carolina. What is my soil type?"
    Assistant: "Charlotte, NC typically has clay-heavy soil with moderate drainage. Amending it with compost can improve quality."

    User 2: "What’s the best way to grow tomatoes?"
    Assistant: "Tomatoes thrive in well-drained, loamy soil with a pH of 6.0-6.8. Ensure they receive 6-8 hours of sunlight daily."

    User 3: "What plants can grow well here?"
    Assistant:  
    "In Charlotte, NC, you can successfully grow a variety of plants. Consider these options:

    - **Perennials**:  
    - Coneflowers  
    - Daylilies  
    - Hostas  

    - **Vegetables**:  
    - Tomatoes (loamy, well-drained soil)  
    - Peppers  
    - Beans  

    - **Shrubs**:  
    - Hydrangeas  
    - Viburnums  

    - **Trees**:  
    - Oaks  
    - Maples  

    Amending your soil with organic matter will further enhance plant growth and health."

    User 3: "Who won the Super Bowl?"
    Assistant: "I can only assist with gardening and soil-related questions."

    User 4: "What is the meaning of life?"
    Assistant: "I specialize in gardening advice. Let me know if you have soil or plant care questions!"
    `;

    try {
        const messages = [
            { role: "system", content: systemPrompt },
            ...chatHistory, //Previous conversation messages
            { role: "user", content: message }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
            max_tokens: 400,
            temperature: 0.5
        });

        if (!completion.choices || completion.choices.length === 0) {
            console.error("OpenAI returned an unexpected response:", completion);
            throw new Error("Invalid response from OpenAI");
        }

        const chatbotMessage = completion.choices[0]?.message?.content || "I couldn't process your request.";

        res.json({ response: chatbotMessage });

    } catch (error) {
        console.error("OpenAI chatbot Error:", error);
        res.status(500).json({
            response: "Sorry, I couldn't process your request. Please try again later.",
            error: error.message,
        });
    }
};

module.exports = { getChatbotResponse };

