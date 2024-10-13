import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchAndFilter from "../../common/searchAndFilter/SearchAndFilter";
import "./CSROrderList.css"; // Import CSS
import AdminNavBar from "../../common/adminNavBar/AdminNavBar";
import CSRNavBar from "../../common/csrNavBar/CSRNavBar"; // Import CSR NavBar
import { useAuthContext } from "../../../hooks/useAutContext"; // Import the AuthContext
import { getUserRole } from "../../../hooks/useRoles"; // Import the global state
import Footer from "./../../common/footer/Footer";

const CSROrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const { user } = useAuthContext(); // Get the user object from the context
  const userRole = getUserRole(); // Get the current user role

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5133/api/order");
        setOrders(response.data);

        const uniqueCategories = [
          ...new Set(response.data.map((order) => order.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearchQuery = order.items?.some((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesCategory = selectedCategory
      ? order.items?.some((item) => item.category === selectedCategory)
      : true;

    return matchesSearchQuery && matchesCategory;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  const updateOrderStatus = async (orderId) => {
    try {
      const status = selectedStatus[orderId];
      const id = orderId;
      await axios.put(`http://localhost:5133/api/order/${id}/status`, status, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Updated status to:", status);
      if (status === "Canceled") {
        const order = orders.find((order) => order.id === orderId);
        const customerId = order.userId;
        const notificationDto = {
          message: "Your order has been canceled successfully.",
          notificationType: "Customer",
        };
        await sendCancellationNotification(customerId, notificationDto);
        for (const item of order.items) {
          await restockProduct(item.id, item.qty);
        }
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  const sendCancellationNotification = async (customerId, notificationDto) => {
    try {
      await axios.post(
        `http://localhost:5133/api/Notification/csr?customerId=${customerId}`,
        notificationDto
      );
    } catch (err) {
      console.error("Failed to send notification:", err);
    }
  };

  const restockProduct = async (productId, quantity) => {
    try {
      await axios.put(
        `http://localhost:5133/api/product/restock/${productId}`,
        quantity,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error("Failed to restock product:", err);
    }
  };

  if (loading) {
    return <div className="csr-order-loading">Loading...</div>;
  }

  if (error) {
    return <div className="csr-order-error">{error}</div>;
  }

  return (
    <div>
      {userRole === "admin0000" && <AdminNavBar />}
      {userRole === "csr" && <CSRNavBar />}
      <div className="csr-order-container">
        <div className="csr-order-inner-container">
          <h2 className="csr-order-title">Order List</h2>

          {/* Search and Filter section */}
          <div className="csr-search-filter-container">
            {/* Search bar */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button>
                <i className="fa fa-search"></i>
              </button>
            </div>

            {/* Category dropdown */}
            <select
              className="category-dropdown"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {filteredOrders.length === 0 ? (
            <p className="csr-order-empty">No orders found for this user.</p>
          ) : (
            <table className="csr-order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>
                      <ul className="csr-order-items-list">
                        {order.items?.map((item) => (
                          <li key={item.id}>
                            {item.name} (Qty: {item.qty})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>{order.status}</td>
                    <td>
                      <select
                        className="csr-order-status-select"
                        value={selectedStatus[order.id] || ""}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="">Select Status</option>
                        <option value="Purchased">Purchased</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                      <button
                        className="csr-order-update-btn"
                        onClick={() => updateOrderStatus(order.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CSROrderList;
