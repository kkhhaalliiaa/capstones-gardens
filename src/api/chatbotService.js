const API_URL = "http://localhost:3002/api/chatbot";

export const fetchChatbotResponse = async (message) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error:", error);
        return "Error connecting to chatbot.";
    }
};