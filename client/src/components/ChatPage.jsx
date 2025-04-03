import React, { useRef, useState, useEffect } from "react";
import backgroundImage from "../assets/LandingPageBG.jpg";
import { useNavigate } from "react-router-dom";

let API_URL = 'http://localhost:8000';

const ChatPage = () => {
  const navigate = useNavigate();
  const chatSectionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const conversationId = useRef(Math.random().toString(36).substring(7));

  const scrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Get initial message when component mounts
    fetch(`${API_URL}/chatbot`, {
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
        const response = await fetch(`${API_URL}/chatbot`, {
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
            text: `Sorry, I'm having trouble connecting to the server. node process: ${error}`,
            isUser: false
        }]);
    }
  };

  const styles = {
    container: {
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "1rem",
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -2,
      backgroundRepeat: "repeat-y",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(101, 67, 33, 0.5)",
      zIndex: -1,
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "1rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
    },
    paragraph: {
      fontSize: "1.2rem",
      color: "#eee",
      textAlign: "center",
      marginBottom: "1.5rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    },
    body: {
      fontSize: "2.5rem",
      color: "#eee",
      textAlign: "center",
      marginBottom: "1rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    },
    button: {
      padding: "1rem 4rem",
      backgroundColor: "#000",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "50px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
      display: "block",
      margin: "0 auto",
    },
    buttonHover: {
      backgroundColor: "#333",
    },
    chatsection: {
      transform: "translateY(100px)",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    chatbackground: {
      background: "white",
      height: "800px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    trydemo: {
      paddingTop: "50px",
      color: "white",
      textAlign: "center",
    },
    chatWindow: {
      background: "white",
      height: "600px",
      width: "80%",
      maxWidth: "800px",
      margin: "20px auto",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    messages: {
      flex: 1,
      overflowY: "auto",
      padding: "20px",
      backgroundColor: "#f8f9fa",
    },
    message: {
      margin: "10px 0",
      padding: "10px 15px",
      borderRadius: "15px",
      maxWidth: "70%",
      wordWrap: "break-word",
    },
    userMessage: {
      backgroundColor: "#007bff",
      color: "white",
      marginLeft: "auto",
    },
    botMessage: {
      backgroundColor: "#e9ecef",
      color: "black",
    },
    inputForm: {
      display: "flex",
      padding: "20px",
      borderTop: "1px solid #dee2e6",
      backgroundColor: "white",
    },
    messageInput: {
      flex: 1,
      padding: "10px",
      border: "1px solid #dee2e6",
      borderRadius: "5px",
      marginRight: "10px",
      fontSize: "1rem",
    },
    sendButton: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    sendButtonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>
      <div>
        <h1 style={styles.heading}>Welcome to ThriveBot!</h1>
        <div
          style={{
            width: "50%",
            height: "4px",
            backgroundColor: "black",
            margin: "20px auto",
          }}
        ></div>
        <h2 style={styles.body}>
          Our goal is to help address <br /> and maintain our users <br />
          mental well-being through <br /> our powerful AI-based <br /> chatbot
        </h2>
        <p style={styles.paragraph}>
          <strong>
            Our platform offers a wide variety of tools <br /> and resources to
            support your mental well-being goals
          </strong>
        </p>
        <button
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
          onClick={scrollToChat}
        >
          TRY IT NOW ↓
        </button>
      </div>

      <div ref={chatSectionRef} style={styles.chatsection}>
        <div style={styles.chatbackground}>
          <h2 style={styles.trydemo}>Try the Demo!</h2>
          <div style={styles.chatWindow}>
            <div style={styles.messages}>
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.message,
                    ...(message.isUser ? styles.userMessage : styles.botMessage)
                  }}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} style={styles.inputForm}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                style={styles.messageInput}
                onFocus={(e) => e.target.style.borderColor = "#007bff"}
                onBlur={(e) => e.target.style.borderColor = "#dee2e6"}
              />
              <button 
                type="submit" 
                style={styles.sendButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.sendButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.sendButton.backgroundColor}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
