import React, { useState } from "react";
import { useCSRLogin } from "../../../hooks/useCSRLogin";
import "./CSRLogin.css"; // Import the CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setUserRole } from "../../../hooks/useRoles";
import { BiShow, BiHide } from "react-icons/bi"; // Import eye icons

function CSRLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useCSRLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Attempt login and get success status
    const loginSuccess = await login(username, password);

    // Navigate only if login was successful
    if (loginSuccess) {
      const role = "csr"; // Set user role for CSR
      setUserRole(role);  // Set global user role
      navigate("/csr-orders"); // Redirect to the CSR orders page
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  return (
    <div className="csr-login-container">
      <form onSubmit={handleSubmit} className="csr-login-form">
        <h2 className="csr-login-title">CSR Login</h2>
        <div className="form-group">
          <label htmlFor="username" className="csr-form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="csr-form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
              type="button"
              className="password-toggle-button"
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {isPasswordVisible ? <BiHide /> : <BiShow />} {/* Show or hide icon based on state */}
            </button>
        </div>
        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="csr-login-error">{error}</div>}
      </form>
    </div>
  );
}

export default CSRLogin;
