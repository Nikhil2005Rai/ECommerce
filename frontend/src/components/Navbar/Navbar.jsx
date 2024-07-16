import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className="flex justify-around p-4 shadow-md">
      <div className="flex items-center gap-2.5">
        <img src={logo} alt="" className="w-12" />
        <p className="text-gray-800 text-2xl font-medium">SHOPPER</p>
      </div>
      <ul className="flex items-center gap-12 text-gray-600 text-lg font-medium ">
        <li
          className="flex-col justify-center items-center  cursor-pointer"
          onClick={() => {
            setMenu("shop");
            console.log(menu);
          }}
        >
          Shop
          {menu === "shop" && (
            <hr className="bg-red-500 h-1  rounded-xl mt-2" />
          )}
        </li>
        <li
          className="flex-col justify-center items-center  cursor-pointer"
          onClick={() => {
            setMenu("men");
            console.log(menu);
          }}
        >
          Men
          {menu === "men" && <hr className="bg-red-500 h-1  rounded-xl mt-2" />}
        </li>
        <li
          className="flex-col justify-center items-center cursor-pointer"
          onClick={() => {
            setMenu("women");
          }}
        >
          Women
          {menu === "women" && (
            <hr className="bg-red-500 h-1  rounded-xl mt-2" />
          )}
        </li>
        <li
          className="flex-col justify-center items-center cursor-pointer"
          onClick={() => {
            setMenu("kids");
          }}
        >
          Kids
          {menu === "kids" && (
            <hr className="bg-red-500 h-1  rounded-xl mt-2" />
          )}
        </li>
      </ul>
      <div className="flex items-center gap-12">
        <button className="w-32 h-12 border border-gray-600 rounded-full text-gray-600 text-lg font-medium bg-white cursor-pointer hover:bg-gray-100 hover:text-gray-700 focus:outline-none transition duration-300 ease-in-out">
          Login
        </button>
        <img src={cart_icon} alt="" className="w-8" />
        <div className="w-5 h-5 flex items-center justify-center -mt-8 -ml-14 rounded-xl size-4 bg-red-600 text-white">
          0
        </div>
      </div>
    </div>
  );
};

export default Navbar;
