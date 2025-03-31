import React from "react";
import backgroundImage from "../assets/LandingPageBG.jpg";

const LandingPage = () => {
  const styles = {
    container: {
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center-left",
      padding: "1rem",
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -2,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(101, 67, 33, 0.5)", // Brown overlay with opacity
      zIndex: -1,
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "1rem",
      marginLeft: "4rem",
      marginTop: "7rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    },
    paragraph: {
      fontSize: "1.2rem",
      color: "#eee",
      textAlign: "left",
      marginBottom: "1.5rem",
      marginLeft: "4rem",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    },
    body: {
      fontSize: "2.5rem",
      color: "#eee",
      textAlign: "left",
      marginLeft: "4rem",
      marginTop: "1rem",
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
      marginLeft: "4rem"
    },
    buttonHover: {
      backgroundColor: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>
      <h1 style={styles.heading}>Welcome to ThriveBot!</h1>
      <div style={{ width: "500px", height: "4px", backgroundColor: "black", margin: "20px 0", marginLeft: "65px"}}></div>
      <h2 style={styles.body}>Our goal is to help address <br /> and maintain our users <br /> mental well-being through <br /> our powerful AI based <br /> chatbot</h2>
      <p style={styles.paragraph}>
        <strong> Our platform, offers a wide variety of tools <br /> and resources to support your mental well-being goals</strong>
      </p>
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
      >
        SIGN UP HERE
      </button>
    </div>
  );
};

export default LandingPage;