import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/Admin_Assets/upload_area.svg";
import axios from "axios";

const AddProduct = () => {
  const [image, setImage] = useState(null);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files);
  };

  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    // console.log(productDetails);
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("category", productDetails.category);
    formData.append("new_price", productDetails.new_price);
    formData.append("old_price", productDetails.old_price);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "/products/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      alert("Product added successfully!");

      setProductDetails({
        name: "",
        category: "women",
        new_price: "",
        old_price: "",
      });
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          placeholder="Type here"
          value={productDetails.name}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            placeholder="Type here"
            value={productDetails.old_price}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            placeholder="Type here"
            value={productDetails.new_price}
            onChange={changeHandler}
            required
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="add-product-selector"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addProduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          onChange={imageHandler}
          hidden
          required
        />
      </div>
      <button className="addproduct-btn" onClick={addProduct}>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
