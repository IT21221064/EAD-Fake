import React, { useState } from "react";
import { useCSRLogin } from "../../../hooks/useCSRLogin";
import "./CSRLogin.css"; // Import the CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setUserRole } from "../../../hooks/useRoles";

function CSRLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useCSRLogin();
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

  return (
    <div className="csr-login-container">
      <form onSubmit={handleSubmit} className="csr-login-form">
        <h2 className="csr-login-title">CSR Login</h2>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
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
          <label htmlFor="password" className="form-label">
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
