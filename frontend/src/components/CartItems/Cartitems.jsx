import React, { useEffect, useState } from "react";
import "./CartItems.css";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png";

const Cartitems = () => {

  const { cartItems, getCart, getTotalCartAmount, removeFromCart } =
    useContext(ShopContext);


  useEffect(() => {
    getCart();
  }, [cartItems]);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems.map((item) => {
          return (
            <div key={item.product}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={item.productDetails.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{item.productDetails.name}</p>
                <p>${item.productDetails.new_price}</p>
                <button className="cartitems-quantity">{item.quantity}</button>
                <p>
                  $
                  {Number(item.productDetails.new_price) *
                    Number(item.quantity)}
                </p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(item.product);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Enter Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
