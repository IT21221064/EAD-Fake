import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminProductPage.css"; // Import custom CSS for styling
import AdminNavBar from "../../common/adminNavBar/AdminNavBar";
import Footer from "../../common/footer/Footer";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
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

  return (
    <div>

    <AdminNavBar/>
    <div className="admin-product-page">
      


        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        {/* Category Filter Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {products.length === 0 ? (
          <p>No products found for this user.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
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
                  <p className="product-description"> {product.description}</p>
                  <p className="product-price-tag">
                    Price:{" "}
                    <span className="product-price"> ${product.price}</span>
                  </p>
                  <p className="product-price-tag">
                    Category:
                    <span className="product-price"> {product.category}</span>
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
                    Vendor ID:
                    <span className="product-price"> {product.vendorId}</span>
                  </p>

                  <p className="product-price-tag">
                    Status: <span>{product.status}</span>
                  </p>

                  <div className="button-group">
  <button
    className="btn btn-danger delete-btn"
    onClick={() => handleDelete(product.id)}
  >
    Delete
  </button>
  <br/><br/>
  <button
    className="btn btn-success activate-btn"
    onClick={() => handleActivate(product.id)}
    disabled={product.status === "Active"}
    style={{ width: "220px" }} // Inline style for width
  >
    {product.status === "Active" ? "Activated" : "Activate"}
  </button>
</div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminProductPage;
