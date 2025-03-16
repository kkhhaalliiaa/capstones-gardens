import React, { useState } from "react";
import { fetchChatbotResponse } from "../api/chatbotService";
import { X, Flower } from 'lucide-react';

import "../../public/css/Chatbot.css"; // CSS for Chatbot component

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { role: "user", content: input }]);
        setInput("");

        const botResponse = await fetchChatbotResponse(input);
        setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: botResponse }]);
    };

    return (
        <div className="chatbot-container">
            <div className={`chatbot-icon ${isOpen ? "open" : ""}`} onClick={toggleChatbot}>
            {isOpen ? <X /> : <Flower />
            }
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