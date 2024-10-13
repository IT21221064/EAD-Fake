import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AllVendors.css";
import AdminNavBar from "../../common/adminNavBar/AdminNavBar";
import Footer from "../../common/footer/Footer";

function AllVendors() {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await axios.get("http://localhost:5133/api/vendor");
        setVendors(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVendors();
  }, []);

  // Handle navigation to add vendor page
  const handleAddVendor = () => {
    navigate("/vendor-register");
  };

  return (
    <div>
      <AdminNavBar />
      <div className="all-vendors-container">
        <div className="vendor-container">
        <div className="vendor-list-header">
          <h1 className="vendor-list-title">Vendor List</h1>
          <button className="btn-add-vendor" onClick={handleAddVendor}> Add Vendor</button>
        </div>
        <table className="vendor-list-table">
          <thead >
            <tr>
              <th className="vendor-list-header">Vendor ID</th>
              <th className="vendor-list-header">Email</th>
              <th className="vendor-list-header">Username</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="vendor-item-row">
                <td>{vendor.vendorId}</td>
                <td>{vendor.email}</td>
                <td>{vendor.username}</td>

              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="vendor-item-row">
                  <td>{vendor.vendorId}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllVendors;
