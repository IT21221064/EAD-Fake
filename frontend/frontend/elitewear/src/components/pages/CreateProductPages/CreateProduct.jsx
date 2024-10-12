import React, { useState } from "react";
import axios from "axios";
import "./CreateProduct.css"; // Import the CSS file
import VendorNavBar from "../../common/vendorNavBar/VendorNavBar";

const CreateProduct = () => {
  // State to hold form data and image
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    vendorId: "",
    status: "",
    imageUrl: "", // This will hold the image URL after upload
  });
  const [image, setImage] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentVendorId = currentUser?.vendor?.vendorId;
  console.log(currentVendorId);

  const categories = [
    "Computers",
    "Computer Components",
    "Peripherals & Accessories",
    "Storage & Networking",
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // If an image is selected, upload it first
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadResponse = await axios.post(
          "http://localhost:5133/api/product/upload-image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        imageUrl = uploadResponse.data.imageUrl;
      }

      // Send POST request to your API with product data and image URL
      const response = await axios.post("http://localhost:5133/api/product", {
        id: product.id,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        category: product.category,
        quantity: parseInt(product.quantity),
        vendorId: parseInt(currentVendorId),
        status: "Pending",
        imageUrl: imageUrl,
      });

      console.log(response.data);
      alert("Product created successfully!");
      setProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        vendorId: "",
        imageUrl: "", // Reset the image URL
      });
      setImage(null); // Clear the selected image
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <>
 <VendorNavBar/>    
  
    <div className="create-product-container">
      <h2 className="create-product-title">Create Product</h2>
      <form onSubmit={handleSubmit} className="create-product-form">
        <div className="form-group">
          <label className="form-label">Id</label>
          <input
            type="text"
            name="id"
            className="form-input"
            value={product.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            className="form-input"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-input"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-input"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-file-input"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn-submit">
          Create Product
        </button>
      </form>
    </div>
    </>
  );
};

export default CreateProduct;
