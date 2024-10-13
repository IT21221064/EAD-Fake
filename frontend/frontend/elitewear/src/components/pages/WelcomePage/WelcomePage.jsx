import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './WelcomePage.css'; 

const WelcomePage = () => {
  const navigate = useNavigate(); 
  const [typedText, setTypedText] = useState(''); // State for typed text
  const fullText = '  Welcome to Phantom Computers! '; // Full text to type out
  const typingSpeed = 100; // Speed of typing in milliseconds


  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < (fullText.length - 1)) {
        setTypedText((prevText) => prevText + fullText[index]);   

        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []); // Removed fullText dependency

  const handleAdminLogin = () => {
    navigate('/admin-login'); 
  };

  const handleCSRLogin = () => {
    navigate('/csr-login'); 
  };

  const handleVendorLogin = () => {
    navigate('/vendor-login'); 
  };

  return (
    <div className="welcome-container">
      <img src="./Logo(3).png" alt="Company Logo" className="landing-logo" />
      <div className="welcome-content">
        <h4 className="welcome-title">{typedText}</h4> {/* Display the typed text */}
      </div>
      <div className="welcome-subtitle-container">
        <h4 className="welcome-subtitle">All your computer needs in a single place</h4>
      </div>
      <div className="welcome-buttons">
        <button className="admin-btn-login common-btn" onClick={handleAdminLogin}>
          Admin Login
        </button>
        <button className="csr-btn-login common-btn" onClick={handleCSRLogin}>
          CSR Login
        </button>
        <button className="vendor-btn-login common-btn" onClick={handleVendorLogin}>
          Vendor Login
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
