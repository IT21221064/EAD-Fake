import React, { useState } from "react";
import axios from "axios";
import "./RegisterVendor.css"; // Import CSS file
import AdminNavBar from "../../common/adminNavBar/AdminNavBar";

const RegisterVendor = () => {
  const [vendor, setVendor] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({
      ...vendor,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5133/api/vendor/register",
        {
          username: vendor.username,
          email: vendor.email,
          password: vendor.password,
        }
      );

      console.log(response.data);
      alert("Profile created successfully!");
      setVendor({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile.");
    }
  };

  return (
    <div>
      <AdminNavBar/>
    <div className="register-vendor-container">
      <h2 className="register-vendor-title">Create Profile</h2>
      <form className="register-vendor-form" onSubmit={handleSubmit}>
        <div className="register-vendor-input-group">
          <label className="register-vendor-label">Username</label>
          <input
            type="text"
            name="username"
            value={vendor.username}
            onChange={handleChange}
            required
            className="register-vendor-input"
          />
        </div>
        <div className="register-vendor-input-group">
          <label className="register-vendor-label">Email</label>
          <input
            type="email" // Changed to "email" type for better validation
            name="email"
            value={vendor.email}
            onChange={handleChange}
            className="register-vendor-input"
            required
          />
        </div>
        <div className="register-vendor-input-group">
          <label className="register-vendor-label">Password</label>
          <input
            type="password" // Changed to "password" type for security
            name="password"
            value={vendor.password}
            onChange={handleChange}
            required
            className="register-vendor-input"
          />
        </div>
        <button type="submit" className="register-vendor-button">
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default RegisterVendor;
