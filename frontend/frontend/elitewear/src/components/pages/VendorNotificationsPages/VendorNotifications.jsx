import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VendorNotifications.css"; // Import the CSS file
import VendorNavBar from "../../common/vendorNavBar/VendorNavBar";

const VendorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const currentVendorId = currentUser?.vendor?.vendorId;
    console.log(currentVendorId);
    const vendorId = currentVendorId;
    const fetchCustomerNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5133/api/Notification/csr/${vendorId}`
        );
        setNotifications(response.data);
      } catch (err) {
        setError("Failed to fetch notifications from customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerNotifications();
  }, []);

  if (loading) {
    return <div className="vendor-notifications-loading">Loading...</div>;
  }

  if (error) {
    return <div className="vendor-notifications-error">{error}</div>;
  }

  return (
    <div>
    <VendorNavBar/>
    <div className="vendor-notifications-container">
      <h2 className="vendor-notifications-title">Notifications For Vendor</h2>
      {notifications.length === 0 ? (
        <p className="vendor-notifications-empty">
          No notifications found from System.
        </p>
      ) : (
        <table
          className="vendor-notifications-table"
          border="1"
          cellPadding="5"
          cellSpacing="0"
        >
          <thead>
            <tr className="vendor-notifications-header">
              <th>ID</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id} className="vendor-notifications-row">
                <td>{notification.id}</td>
                <td>{notification.message}</td>
                <td>
                  {new Date(notification.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default VendorNotifications;
