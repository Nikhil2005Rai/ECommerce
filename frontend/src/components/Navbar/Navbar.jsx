import React, { useContext, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { ShopContext } from "../../context/ShopContext";
import nav_dropdown from  '../../assets/nav_dropdown.png'

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef()

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

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
      <img src={nav_dropdown} alt="" onClick={dropdown_toggle} className="nav-dropdown"/>
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
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
