import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSRNotificationList.css";

const CSRNotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    const fetchCustomerNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5133/api/Notification/customer"
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

  const openReplyModal = (notification) => {
    setCurrentNotification(notification);
    setReplyMessage("");
    setIsModalOpen(true);
  };

  const handleReplySubmit = async () => {
    if (!currentNotification || !replyMessage) {
      alert("Please enter a reply message.");
      return;
    }

    try {
      const notificationDto = {
        message: replyMessage,
      };
      const customerId = currentNotification.customerId;

      await axios.post(
        `http://localhost:5133/api/Notification/csr?customerId=${customerId}`,
        {
          customerId: customerId,
          ...notificationDto,
        }
      );

      alert("Reply sent successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to send reply:", err);
    }
  };

  const closeReplyModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="csr-notifications-loading">Loading...</div>;
  }

  if (error) {
    return <div className="csr-notifications-error">{error}</div>;
  }

  return (
    <div className="csr-notifications-container">
      <h2>Notifications From Customers</h2>
      {notifications.length === 0 ? (
        <p>No notifications found from customers.</p>
      ) : (
        <table className="csr-notifications-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Date</th>
              <th>Reply</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
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
                <td>
                  <button
                    className="csr-notifications-reply-btn"
                    onClick={() => openReplyModal(notification)}
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="csr-modal-overlay">
          <div className="csr-modal">
            <h2>Reply to Notification</h2>
            <p>{currentNotification?.message}</p>
            <textarea
              className="csr-modal-textarea"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here"
              rows={5}
            />
            <br />
            <button
              className="csr-modal-btn csr-modal-btn-submit"
              onClick={handleReplySubmit}
            >
              Send Reply
            </button>
            <button
              className="csr-modal-btn csr-modal-btn-cancel"
              onClick={closeReplyModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSRNotificationList;
