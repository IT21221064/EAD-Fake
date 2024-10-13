import React, { useState } from "react";
import axios from "axios";
import "./RegisterVendor.css"; // Import CSS file
import AdminNavBar from "../../common/adminNavBar/AdminNavBar";
import Footer from "../../common/footer/Footer";

const RegisterVendor = () => {
  const [vendor, setVendor] = useState({
    username: "",
    email: "",
    password: "",
    NIC: "",
    Birthday: "", // Birthday field
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
          NIC: vendor.NIC,
          Birthday: vendor.Birthday,
        }
      );

      console.log(response.data);
      alert("Profile created successfully!");
      setVendor({
        username: "",
        email: "",
        password: "",
        NIC: "",
        Birthday: "",
      });
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile.");
    }
  };

  return (
    <div className="register-vendor-page">
      <AdminNavBar />

      <div className="register-vendor-container">
        <h2 className="register-vendor-title">Register Vendor</h2>
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
              type="email"
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
              type="password"
              name="password"
              value={vendor.password}
              onChange={handleChange}
              required
              className="register-vendor-input"
            />
          </div>
          <div className="register-vendor-input-group">
            <label className="register-vendor-label">NIC</label>
            <input
              type="text"
              name="NIC"
              value={vendor.NIC}
              onChange={handleChange}
              required
              className="register-vendor-input"
            />
          </div>
          <div className="register-vendor-input-group">
            <label className="register-vendor-label">Birthday</label>
            <input
              type="date" // Changed to "date" type to add a calendar
              name="Birthday"
              value={vendor.Birthday}
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
      <Footer />
    </div>
  );
};

export default RegisterVendor;
