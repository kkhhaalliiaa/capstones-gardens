import React, { useState } from "react";
import { fetchChatbotResponse } from "../api/chatbotService";
import ReactMarkdown from "react-markdown";
import { X, Flower } from 'lucide-react';
import "../../public/css/Chatbot.css"; 

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello! I am your gardening assistant. Ask me about soil types, plant care, or anything gardening-related!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { role: "user", content: input }]);
        setInput("");
        setIsLoading(true);

        const botResponse = await fetchChatbotResponse(input, messages);
        setIsLoading(false);
        setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: botResponse }]);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents new line in input field
            sendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <div className="chatbot-bubble" onClick={toggleChatbot}>
                    Need Help?
                </div>
            )}
            <div className={`chatbot-icon ${isOpen ? "open" : ""}`} onClick={toggleChatbot}>
                {isOpen ? <X /> : <Flower />}
            </div>

            {isOpen && (
                <div className="chatbox">
                    <div className="chatbox-header">
                        <h3>Chatbot</h3>
                        <X className="close-btn" onClick={toggleChatbot} /> {/* X button always visible */}
                    </div>
                    <div className="chatbox-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        ))}
                        {isLoading && (
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
                            onKeyDown={handleKeyPress}
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


