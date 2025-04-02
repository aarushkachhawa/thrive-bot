import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatbotPage.css';

const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://thrive-bot-production.up.railway.app/'
    : 'http://localhost:8000';

const ChatbotPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const conversationId = useRef(Math.random().toString(36).substring(7));

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Get initial message when component mounts
        fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: '',
                conversationId: conversationId.current
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.isInitial) {
                setMessages([{
                    text: data.response,
                    isUser: false
                }]);
            }
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message to chat
        const userMessage = {
            text: inputMessage,
            isUser: true
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: inputMessage,
                    conversationId: conversationId.current
                })
            });

            const data = await response.json();
            
            // Add bot response to chat
            setMessages(prev => [...prev, {
                text: data.response,
                isUser: false
            }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                text: "Sorry, I'm having trouble connecting to the server.",
                isUser: false
            }]);
        }
    };

    return (
        <div className="chatbot-container">
            <h1>Thrive Support Chat</h1>
            <div className="chat-window">
                <div className="messages">
                    {messages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
                        >
                            {message.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="message-input"
                    />
                    <button type="submit" className="send-button">
                        Send
                    </button>
                </form>
            </div>
            <button onClick={() => navigate('/')} className="back-button">
                Back to Home
            </button>
        </div>
    );
};

export default ChatbotPage; 