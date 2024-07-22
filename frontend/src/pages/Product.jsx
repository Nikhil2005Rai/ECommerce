import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrums/Breadcrum";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const {productId}  = useParams();
  const product = all_product.find(
    (product) => product.id === Number(productId)
  );
  // console.log(product)
  return (
    <div>
      <Breadcrum product={product} />
    </div>
  );
};

export default Product;
