import React, { useState } from "react";
import { fetchChatbotResponse } from "../api/chatbotService";
import { X, Flower } from 'lucide-react';
import "../../public/css/Chatbot.css"; // CSS for Chatbot component

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello! I am your gardening assistant. Ask me about soil types, plant care, or anything gardening-related!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false); // ✅ State for loading animation

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { role: "user", content: input }]);
        setInput("");
        setIsLoading(true); // ✅ Show loading animation

        const botResponse = await fetchChatbotResponse(input);
        setIsLoading(false); // ✅ Hide loading animation
        setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: botResponse }]);
    };

    return (
        <div className="chatbot-container">
            <div className={`chatbot-icon ${isOpen ? "open" : ""}`} onClick={toggleChatbot}>
                {isOpen ? <X /> : <Flower />}
            </div>

            {isOpen && (
                <div className="chatbox">
                    <div className="chatbox-header">
                        <h3>Chatbot</h3>
                    </div>
                    <div className="chatbox-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                {msg.content}
                            </div>
                        ))}
                        {isLoading && ( // ✅ Show typing animation while waiting for response
                            <div className="message assistant typing">
                                <span>.</span><span>.</span><span>.</span>
                            </div>
                        )}
                    </div>
                    <div className="chatbox-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about soil, plants..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
