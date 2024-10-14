import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminProductPage.css"; // Import custom CSS for styling
import AdminNavBar from "../../common/adminNavBar/AdminNavBar";
import Footer from "../../common/footer/Footer";
import { FaCheck, FaTrash } from "react-icons/fa";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5133/api/product");
        setProducts(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5133/api/product/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully.");
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product.");
    }
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "table" : "grid"));
  };

  const handleActivate = async (id) => {
    try {
      await axios.put(`http://localhost:5133/api/product/activate/${id}`);
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, status: "Active" } : product
        )
      );
      alert("Product activated successfully.");
    } catch (err) {
      console.error("Failed to activate product:", err);
      alert("Failed to activate product.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearchQuery && matchesCategory;
  });

  return (
    <div>
      <AdminNavBar />
      <div className="admin-product-page">
        <div className="search-filter-container">
          <div className="admin-search-filter-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
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
            <div className="form-check form-switch">
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={viewMode === "table"}
                  onChange={toggleViewMode}
                />
                {viewMode === "grid" ? "Grid View" : "Table View"}
              </label>
            </div>
          </div>

          {products.length === 0 ? (
            <p>No products found for this user.</p>
          ) : viewMode === "grid" ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                    />
                  )}
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price-tag">
                      Price:{" "}
                      <span className="product-price">${product.price}</span>
                    </p>
                    <p className="product-price-tag">
                      Category:{" "}
                      <span className="product-price">{product.category}</span>
                    </p>
                    <p className="product-price-tag">
                      Quantity:
                      <span
                        className={
                          product.quantity < 10 ? "low-stock" : "in-stock"
                        }
                      >
                        {product.quantity < 10
                          ? `Low Stock (${product.quantity})`
                          : product.quantity}
                      </span>
                    </p>
                    <p className="product-price-tag">
                      Vendor ID:{" "}
                      <span className="product-price">{product.vendorId}</span>
                    </p>
                    <p className="product-price-tag">
                      Status: <span>{product.status}</span>
                    </p>
                    <div className="button-group">
                      <button
                        className="btn btn-danger delete-btn"
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                      <br />
                      <br />
                      <button
                        className="btn btn-success activate-btn"
                        onClick={() => handleActivate(product.id)}
                        disabled={product.status === "Active"}
                        style={{ width: "220px" }}
                      >
                        <FaCheck />{" "}
                        {product.status === "Active" ? "Activated" : "Activate"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Vendor ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="table-product-image"
                        />
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td
                      className={
                        product.quantity < 10 ? "low-stock" : "in-stock"
                      }
                    >
                      {product.quantity < 10
                        ? `Low Stock (${product.quantity})`
                        : product.quantity}
                    </td>
                    <td>{product.vendorId}</td>
                    <td>{product.status}</td>
                    <td>
                      <div className="button-group">
                        <button
                          className="btn btn-danger t-delete-btn"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FaTrash /> Delete
                        </button>
                        <button
                          className="btn btn-success t-activate-btn"
                          onClick={() => handleActivate(product.id)}
                          disabled={product.status === "Active"}
                        >
                          <FaCheck />{" "}
                          {product.status === "Active"
                            ? "Activated"
                            : "Activate"}
                        </button>
                      </div>
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

export default AdminProductPage;
