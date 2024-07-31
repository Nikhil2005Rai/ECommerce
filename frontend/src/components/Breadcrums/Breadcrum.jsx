import React from "react";
import "./Breadcrum.css";
import arrow_icon from "./../../assets/breadcrum_arrow.png";
import { Link } from "react-router-dom";

const Breadcrum = (props) => {
  const { product } = props;
  // console.log(product)
  return (
    <div className="breadcrum">
      <Link to={"/"} style={{all:"unset"}}> HOME</Link> <img src={arrow_icon} alt="" />  <Link to={"/"} style={{all:"unset"}}>SHOP</Link>{" "}
      <img src={arrow_icon} alt="" />
       <Link to={`/${product.category}s`} style={{all:"unset"}}>{product.category}</Link> <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrum;
