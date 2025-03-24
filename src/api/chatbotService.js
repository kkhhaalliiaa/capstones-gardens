const API_URL = ""https://ismael-capstones-gardens.vercel.app"-1h6s.onrender.com/api/chatbot";

export const fetchChatbotResponse = async (message, chatHistory) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, chatHistory }), //Send full conversation history
        });

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error:", error);
        return "Error connecting to chatbot.";
    }
};
