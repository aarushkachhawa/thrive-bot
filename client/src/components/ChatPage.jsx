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
      margin: 0,
      width: "100%",
      overflow: "hidden",
    },
    background: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -2,
      backgroundRepeat: "no-repeat",
      margin: 0,
      padding: 0,
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(101, 67, 33, 0.5)",
      zIndex: -1,
      margin: 0,
      padding: 0,
    },
    heading: {
      fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "1rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      padding: "0 1rem",
    },
    paragraph: {
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
      color: "#eee",
      textAlign: "center",
      marginBottom: "1.5rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      padding: "0 1rem",
    },
    body: {
      fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
      color: "#eee",
      textAlign: "center",
      marginBottom: "1rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      padding: "0 1rem",
    },
    button: {
      padding: "clamp(0.8rem, 2vw, 1rem) clamp(2rem, 6vw, 4rem)",
      backgroundColor: "#000",
      color: "#fff",
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
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
      transform: "translateY(50px)",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: "100%",
      "@media (min-width: 768px)": {
        transform: "translateY(100px)",
      },
    },
    chatbackground: {
      background: "rgba(255, 255, 255, 0.1)",
      minHeight: "800px",
      width: "80%",
      maxWidth: "1000px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backdropFilter: "blur(5px)",
      padding: "1rem",
      borderRadius: "10px",
      "@media (max-width: 768px)": {
        width: "90%",
      },
    },
    trydemo: {
      paddingTop: "30px",
      color: "white",
      textAlign: "center",
      fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
    },
    chatWindow: {
      background: "rgba(255, 255, 255, 0.8)",
      height: "clamp(400px, 70vh, 600px)",
      width: "95%",
      maxWidth: "800px",
      margin: "20px auto",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(10px)",
      "@media (min-width: 768px)": {
        width: "80%",
      },
    },
    messages: {
      flex: 1,
      overflowY: "auto",
      padding: "15px",
      backgroundColor: "rgba(248, 249, 250, 0.7)",
    },
    message: {
      margin: "8px 0",
      padding: "8px 12px",
      borderRadius: "15px",
      maxWidth: "85%",
      wordWrap: "break-word",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      "@media (min-width: 768px)": {
        maxWidth: "70%",
      },
    },
    userMessage: {
      backgroundColor: "rgba(0, 123, 255, 0.9)",
      color: "white",
      marginLeft: "auto",
    },
    botMessage: {
      backgroundColor: "rgba(233, 236, 239, 0.9)",
      color: "black",
    },
    inputForm: {
      display: "flex",
      padding: "15px",
      borderTop: "1px solid rgba(222, 226, 230, 0.5)",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    messageInput: {
      flex: 1,
      padding: "8px 12px",
      border: "1px solid rgba(222, 226, 230, 0.5)",
      borderRadius: "5px",
      marginRight: "10px",
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      color: "black",
    },
    sendButton: {
      padding: "8px 16px",
      backgroundColor: "rgba(0, 123, 255, 0.9)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.2s",
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      whiteSpace: "nowrap",
    },
    sendButtonHover: {
      backgroundColor: "rgba(0, 86, 179, 0.9)",
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
