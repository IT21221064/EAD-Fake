import React, { useState } from "react";
import { useVendorLogin } from "../../../hooks/useVendorLogin";
import { useNavigate } from "react-router-dom";
import "./VendorLogin.css"; // Import updated CSS file
import { BiShow, BiHide } from "react-icons/bi"; // Import eye icons

function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const { login, error, isLoading } = useVendorLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccess = await login(email, password);

    // Navigate only if login was successful
    if (loginSuccess) {
      navigate("/vendor-products"); // Redirect to the vendor products page
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  return (
    <div className="vendor-login-container">
      <form className="vendor-login-form" onSubmit={handleSubmit}>
        <h2 className="vendor-login-title">Vendor Login</h2>
        <div className="vendor-login-input-group">
          <label className="vendor-login-label" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            className="vendor-login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="vendor-login-input-group">
          <label className="vendor-login-label" htmlFor="password">
            Password:
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={isPasswordVisible ? "text" : "password"} // Change input type based on visibility state
              id="password"
              className="vendor-login-input"
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
        </div>
        <button
          type="submit"
          className="vendor-login-button"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="vendor-login-error">{error}</p>}
      </form>
    </div>
  );
}

export default VendorLogin;
