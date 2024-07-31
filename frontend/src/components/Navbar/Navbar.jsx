import React, { useContext, useRef, useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { ShopContext } from "../../context/ShopContext";
import nav_dropdown from "../../assets/nav_dropdown.png";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { isAuthenticated, login, logout } = useAuth();
  const { cartItems, getCart, setCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  // console.log(cartItems)
  


  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!!token) login();
  }, [login]);

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setCartItems([]);
        logout();
      })
      .catch((err) => {
        console.error("Logout error", err);
      });
  };

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <Link to="/" style={{ all: "unset" }}>
        <div
          className="nav-logo"
          onClick={() => {
            setMenu("shop");
          }}
        >
          <img src={logo} alt="" className="" />
          <p className="">SHOPPER</p>
        </div>
      </Link>
      <img
        src={nav_dropdown}
        alt=""
        onClick={dropdown_toggle}
        className="nav-dropdown"
      />
      <ul className="nav-menu" ref={menuRef}>
        <li
          className=""
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/" style={{ all: "unset" }}>
            Shop
          </Link>

          {menu === "shop" && <hr />}
        </li>
        <li
          className="flex-col justify-center items-center  cursor-pointer"
          onClick={() => {
            setMenu("men");
          }}
        >
          <Link to="/mens" style={{ all: "unset" }}>
            Men
          </Link>
          {menu === "men" && <hr className="bg-red-500 h-1  rounded-xl mt-2" />}
        </li>
        <li
          className=""
          onClick={() => {
            setMenu("women");
          }}
        >
          <Link to="/womens" style={{ all: "unset" }}>
            Women
          </Link>

          {menu === "women" && <hr />}
        </li>
        <li
          className=""
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link to="/kids" style={{ all: "unset" }}>
            Kids
          </Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button
              className=""
              onClick={() => {
                setMenu("");
              }}
            >
              Login
            </button>
          </Link>
        )}

        <Link to="/cart">
          <img
            src={cart_icon}
            alt=""
            className="w-8"
            onClick={() => {
              setMenu("");
            }}
          />
        </Link>
        <div className="nav-cart-count">{cartItems.length}</div>
      </div>
    </div>
  );
};

export default Navbar;
