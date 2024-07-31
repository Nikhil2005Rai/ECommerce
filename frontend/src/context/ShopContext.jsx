import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [all_product, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/products/allProducts")
      .then((res) => {
        setAllProducts(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const getCart = (itemId) => {
    const token = Cookies.get("accessToken");
    axios
      .get("http://localhost:8000/api/v1/user/getCartItems", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCartItems(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  
  const removeFromCart = (itemId) => {};

  const getTotalCartAmount = () => {

    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.productDetails.new_price;
    }, 0);
  };

  const getTotalCartItems = () => {
     return cartItems.reduce((total, item) => {
       return total + item.quantity;
     }, 0);
  };

  const contextValue = {
    all_product,
    cartItems,
    getCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
