import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from './components/SignUpPage';
import ConfirmationPage from './components/ConfirmationPage';
import HomePage from './components/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;