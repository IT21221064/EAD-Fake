import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa"; // Importing icons
import "./VendorProducts.css";
import VendorNavBar from "../../common/vendorNavBar/VendorNavBar";
import Footer from "../../common/footer/Footer";

const VendorProducts = () => {
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

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentVendorId = currentUser?.vendor?.vendorId;

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

  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "table" : "grid"));
  };

  if (loading) {
    return <div className="vendor-products-loading">Loading...</div>;
  }

  if (error) {
    return <div className="vendor-products-error">{error}</div>;
  }

  const filteredProducts = products.filter((product) => {
    const matchesVendorId = product.vendorId === currentVendorId;
    const matchesSearchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesVendorId && matchesSearchQuery && matchesCategory;
  });

  return (
    <div>
      <VendorNavBar />
      <div className="vendor-products-container">
        <h2 className="vendor-products-title">My Products</h2>

        <div className="vendor-search-filter-container">
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

        <button className="add-product-btn" onClick={handleAddProduct}>
          <FaPlusCircle /> Add Product
        </button>

        {filteredProducts.length === 0 ? (
          <p className="vendor-products-empty">
            No products found for this user.
          </p>
        ) : viewMode === "grid" ? (
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="vendor-product-item">
                  {product.imageUrl && (
                    <div className="vendor-product-image-wrapper">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="vendor-product-image"
                      />
                    </div>
                  )}
                  <div className="vendor-product-info">
                    <h3 className="vendor-product-name">{product.name}</h3>
                    <p className="vendor-product-description">
                      {product.description}
                    </p>
                    <p className="vendor-product-price">
                      Price: ${product.price}
                    </p>
                    <p className="vendor-product-category">
                      Category: {product.category}
                    </p>
                    <p className="vendor-product-quantity">
                      Quantity: {product.quantity}
                    </p>
                    <div className="vendor-product-actions">
                      <button
                        className="vendor-product-update-btn"
                        onClick={() => handleUpdate(product.id)}
                      >
                        <FaEdit /> Update
                      </button>
                      <button
                        className="vendor-product-delete-btn"
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table className="vendor-products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button
                      className="vendor-product-update-btn"
                      onClick={() => handleUpdate(product.id)}
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      className="vendor-product-delete-btn"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default VendorProducts;
