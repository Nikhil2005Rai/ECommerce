import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [all_product, setAllProducts] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const getAllProducts = async () => {
      await axios
        .get("/products/allProducts")
        .then((res) => {
          setAllProducts(res.data.data);
        })
        .catch((err) => console.error(err));
    };
    getAllProducts();
  }, []);

  const getCart = async () => {
      await axios
        .get("/user/getCartItems",{
          withCredentials: true
        })
        .then((res) => {
          setCartItems(res.data.data);
        })
        .catch((err) => console.error(err));
  };
  // useEffect(() => {
  //   isAuthenticated && getCart();
  // }, [isAuthenticated]);
  const addToCart = async (id) => {
    await axios
      .post(
        "/user/addToCart",
        { productId: id },
        {
          withCredentials: true
        }
      )
      .then((res) => {
        // console.log(res);
        // setCartItems(res.data.data);
        // alert("Product added to cart successfully");
        getCart()
      })
      .catch((err) => console.error(err));
  };
  const removeFromCart = async (itemId) => {
    // console.log(cartItems);
    await axios
      .post(
        "/user/removeFromCart",
        {
          productId: itemId,
        },
        {
          withCredentials: true
        }
      )
      .then((res) => {
        console.log("response: ", res.data.data);
        getCart()
      })
      .catch((err) => console.error(err));
  };

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
    setCartItems,
    getCart,
    addToCart,
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
