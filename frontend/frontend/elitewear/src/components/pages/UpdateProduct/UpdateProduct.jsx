import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateProduct.css"; // Import CSS file

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the route parameters
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    vendorId: "",
    imageUrl: "",
  });

  const categories = [
    "Computers",
    "Computer Components",
    "Peripherals & Accessories",
    "Storage & Networking",
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5133/api/product/${id}`
        );
        setProduct(response.data); // Set the fetched product data
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct(); // Fetch the product data
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5133/api/product/${id}`, product);
      alert("Product updated successfully.");
      navigate("/products"); // Redirect to the products page
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="update-product-container">
      <h2 className="update-product-title">Update Product</h2>
      <form className="update-product-form" onSubmit={handleSubmit}>
        <div className="update-product-input-group">
          <label className="update-product-label">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="update-product-input"
          />
        </div>
        <div className="update-product-input-group">
          <label className="update-product-label">Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="update-product-input"
          />
        </div>
        <div className="update-product-input-group">
          <label className="update-product-label">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="update-product-input"
          />
        </div>
        <div className="update-product-input-group">
          <label className="update-product-label">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="update-product-select"
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="update-product-input-group">
          <label className="update-product-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            className="update-product-input"
          />
        </div>
        <div className="update-product-input-group">
          <label className="update-product-label">Vendor ID</label>
          <input
            type="number"
            name="vendorId"
            value={product.vendorId}
            onChange={handleChange}
            required
            className="update-product-input"
          />
        </div>
        <button type="submit" className="update-product-button">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
