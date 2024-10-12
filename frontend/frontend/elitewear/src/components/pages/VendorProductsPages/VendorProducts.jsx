import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  // Get current user vendorId from local storage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentVendorId = currentUser?.vendor?.vendorId;
  console.log(currentVendorId);

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

  if (loading) {
    return <div className="vendor-products-loading">Loading...</div>;
  }

  if (error) {
    return <div className="vendor-products-error">{error}</div>;
  }

  // Filter products based on the current vendorId, search query, and category
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
  const handleAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <div>
    <VendorNavBar/>
    <div className="vendor-products-container">
  <h2 className="vendor-products-title">My Products</h2>

  {/* Search and Filter section */}
  <div className="search-filter-container">
    {/* Search bar */}
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
  
  <button className="add-product-btn" onClick={handleAddProduct}>Add Product</button>

  {filteredProducts.length === 0 ? (
    <p className="vendor-products-empty">No products found for this user.</p>
  ) : (
    <div className="row">
      {filteredProducts.map((product) => (
        <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4"> {/* Adjust the column classes as needed */}
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
              <p className="vendor-product-description">{product.description}</p>
              <p className="vendor-product-price">Price: ${product.price}</p>
              <p className="vendor-product-category">Category: {product.category}</p>
              <p className="vendor-product-quantity">Quantity: {product.quantity}</p>
              <p className="vendor-product-vendorId">Vendor ID: {product.vendorId}</p>
              <div className="vendor-product-actions">
                <button className="vendor-product-update-btn" onClick={() => handleUpdate(product.id)}>Update</button>
                <button className="vendor-product-delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
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

export default VendorProducts;
