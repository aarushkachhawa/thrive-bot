import React, { useRef } from "react";
import backgroundImage from "../assets/LandingPageBG.jpg";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const navigate = useNavigate();
  const chatSectionRef = useRef(null);

  const scrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({ behavior: "smooth" });
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
    },
    trydemo: {
      paddingTop: "50px",
      color: "white",
      textAlign: "center",
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

      <div className="chat-section" style={styles.chatsection}>
        <section ref={chatSectionRef}>
          <h2 style={styles.trydemo}>Try the Demo!</h2>
          <div className="rectangle" style={styles.chatbackground}></div>
        </section>
      </div>
    </div>
  );
};

export default ChatPage;
