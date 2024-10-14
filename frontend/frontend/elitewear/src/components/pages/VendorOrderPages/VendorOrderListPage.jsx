import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import "./VendorOrderList.css";
import VendorNavBar from "../../common/vendorNavBar/VendorNavBar";
import Footer from "../../common/footer/Footer";

const VendorOrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [itemUserMap, setItemUserMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // For modal state

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.vendor?.vendorId;

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
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchItemUserIds = async () => {
      const userMap = {};
      const itemIds = orders
        .flatMap((order) => order.items?.map((item) => item.id))
        .filter(Boolean);

      for (const id of itemIds) {
        try {
          const response = await axios.get(
            `http://localhost:5133/api/product/${id}`
          );
          userMap[id] = response.data.vendorId;
        } catch (err) {
          console.error(`Failed to fetch user ID for item ${id}:`, err);
        }
      }
      setItemUserMap(userMap);
      setLoading(false); // Set loading to false only after itemUserMap is ready
    };

    if (orders.length) {
      fetchItemUserIds();
    }
  }, [orders]);

  const filteredOrders = orders.filter((order) => {
    const itemsForCurrentUser = order.items?.filter(
      (item) => itemUserMap[item.id] === parseInt(currentUserId)
    );
    return itemsForCurrentUser.length > 0;
  });

  const handleItemStatusChange = (itemId, newStatus) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [itemId]: newStatus,
    }));
  };

  const updateItemStatus = async (orderId, itemId) => {
    try {
      const status = selectedStatus[itemId];
      if (!status) {
        alert("Please select a status before updating.");
        return;
      }

      console.log(
        `Updating status of item ${itemId} in order ${orderId} to ${status}`
      );
      await axios.put(
        `http://localhost:5133/api/order/${orderId}/item/${itemId}`,
        status,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Item status updated successfully!");
    } catch (err) {
      console.error("Failed to update item status:", err);
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    console.log(order); // This logs the order details
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return <div className="vendor-order-loading">Loading...</div>;
  }

  if (error) {
    return <div className="vendor-order-error">{error}</div>;
  }

  return (
    <div>
      <VendorNavBar />
      <div className="vendor-order-container">
        <h2 className="vendor-order-title">Order List</h2>

        {/* Search and Filter section */}
        <div className="search-filter-container">
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
          <p className="vendor-order-empty">No orders found for this user.</p>
        ) : (
          <table className="vendor-order-table">
            <thead>
              <tr className="vendor-order-header">
                <th>Order ID</th>
                <th>User ID</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const itemsForCurrentUser = order.items.filter(
                  (item) => itemUserMap[item.id] === parseInt(currentUserId)
                );

                return (
                  <tr key={order.id} className="vendor-order-row">
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>
                      <ul className="vendor-order-items">
                        {itemsForCurrentUser.map((item) => (
                          <li key={item.id} className="vendor-order-item">
                            {item.name} (Qty: {item.qty}) -{" "}
                            <strong>{item.status}</strong>
                            <br />
                            <select
                              className="vendor-order-status-select"
                              value={selectedStatus[item.id] || ""}
                              onChange={(e) =>
                                handleItemStatusChange(item.id, e.target.value)
                              }
                            >
                              <option value="">Select Status</option>
                              <option value="Purchased">Purchased</option>
                              <option value="Packaging">Packaging</option>
                              <option value="Shipping">Shipping</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                            <button
                              className="vendor-order-update-button"
                              onClick={() =>
                                updateItemStatus(order.id, item.id)
                              }
                            >
                              Update Item Status
                            </button>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>{order.status}</td>
                    <td>
                      <FaEye
                        className="view-details-icon"
                        onClick={() => openOrderDetails(order)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for viewing order details */}
      {selectedOrder && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Order Details</h3>
            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>User ID:</strong> {selectedOrder.userId}
            </p>
            <ul>
              {selectedOrder.items.map((item) => (
                <li key={item.id}>
                  {item.name} (Qty: {item.qty}) - {item.status}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default VendorOrderListPage;
