import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import axios from "axios";
import Cookies from "js-cookie";

const ProductDisplay = (props) => {
  const { product } = props;
  
  const addToCart = async (id) => {
    // console.log(id)
    const token = Cookies.get("accessToken");
    await axios
      .post(
        "http://localhost:8000/api/v1/user/addToCart",
        { productId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        alert("Product added to cart successfully");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img src={product.image} alt="" className="productdisplay-main-img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Elegant and versatile, this classic piece is crafted from high-quality
          fabric to offer both comfort and style. Featuring a timeless design
          with a tailored fit and subtle detailing, it effortlessly transitions
          from day to night. Perfect for any occasion, this item is a must-have
          addition to your wardrobe, providing a sophisticated touch to your
          look.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Sizes</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product._id);
          }}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category :</span>Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
