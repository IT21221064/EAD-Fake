import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './WelcomePage.css'; 

const WelcomePage = () => {
  const navigate = useNavigate(); 


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
        <h4 className="welcome-title">Welcome to Phantom Computers</h4>
      </div>
      <div className="welcome-subtitle-container">
        <h4 className="welcome-subtitle">All your computer needs in a single place</h4>
      </div>
      <div className="welcome-buttons">
        <button className="welcome-btn-login common-btn" onClick={handleAdminLogin}>
          Admin Login
        </button>
        <button className="welcome-btn-login common-btn" onClick={handleCSRLogin}>
          CSR Login
        </button>
        <button className="welcome-btn-login common-btn" onClick={handleVendorLogin}>
          Vendor Login
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
