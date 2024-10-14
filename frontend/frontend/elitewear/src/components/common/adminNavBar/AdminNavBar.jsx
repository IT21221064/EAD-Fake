import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import "./AdminNavBar.css";
import {
  BiHome,
  BiExit,
  BiUser,
  BiGroup,
  BiCollection,
  BiPackage,
  BiBell,
} from "react-icons/bi";

const AdminNavBar = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { logout } = useLogout();

  const handleLogoutClick = () => {
    logout();
    console.log("logout");
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <img src="./Logo(3).png" alt="Company Logo" className="admin-logo" />

      <ul className="admin-nav-links">
        <li>
          <button
            className="admin-nav-btn"
            onClick={() => navigate("/admin-products")}
          >
            <BiPackage
              style={{
                fontSize: "24px",
                marginRight: "8px",
                marginBottom: "1px",
              }}
            />
            Inventory
          </button>
        </li>
        <li>
          <button
            className="admin-nav-btn"
            onClick={() => navigate("/all-users")}
          >
            <BiUser
              style={{
                fontSize: "24px",
                marginRight: "8px",
                marginBottom: "1px",
              }}
            />
            Users
          </button>
        </li>
        <li>
          <button
            className="admin-nav-btn"
            onClick={() => navigate("/csr-orders")}
          >
            <BiCollection
              style={{
                fontSize: "24px",
                marginRight: "8px",
                marginBottom: "1px",
              }}
            />
            Orders
          </button>
        </li>
        <li>
          <button
            className="admin-nav-btn"
            onClick={() => navigate("/all-vendors")}
          >
            <BiGroup
              style={{
                fontSize: "24px",
                marginRight: "8px",
                marginBottom: "1px",
              }}
            />
            Vendors
          </button>
        </li>{" "}
        <li>
          <button
            className="vendor-nav-btn"
            onClick={() => navigate("/csr-notifications")}
          >
            <BiBell
              style={{
                fontSize: "24px",
                marginRight: "8px",
                marginBottom: "1px",
              }}
            />
            Notifications
          </button>
        </li>
        <li>
          <button className="admin-logout-btn" onClick={handleLogoutClick}>
            <BiExit
              style={{
                fontSize: "24px",
                marginRight: "8px",
                marginBottom: "1px",
              }}
            />
            LOGOUT
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
