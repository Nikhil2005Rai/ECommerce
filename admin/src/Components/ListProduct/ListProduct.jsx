import React, { useState, useEffect } from "react";
import "./ListProduct.css";
import axios from "axios";
import cross_icon from "../../assets/Admin_Assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/products/allProducts"
      );
      setAllProducts(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch the data!!");
    }
  };

  const removeProduct = async (_id) => {
    try {
      axios.post("http://localhost:8000/api/v1/products/deleteProduct",{_id});
      alert("Product removed successfully!!!")
    } catch (error) {
      console.error(error);
      alert("Unable to remove product");
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [allProducts]);

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <div
              key={index}
              className="listproduct-format-main listproduct-format"
            >
              <img
                src={product.image}
                alt=""
                className="listproduct-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                src={cross_icon}
                alt=""
                className="listproduct-remove-icon"
                onClick={()=>removeProduct(product._id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
