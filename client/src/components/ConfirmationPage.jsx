import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
    const navigate = useNavigate();
  return (
      <div className="confirmation-page">
          <h1 className='company-name'>Thrive</h1>
          <p>You have successfully signed up! We will notify you as soon as Thrive is released.</p>

          <button className="home-button" onClick={() => navigate("/")}>Return Home</button>
      </div>
  );
};

export default ConfirmationPage;