import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import axios from "axios";
const RelatedProduct = (props) => {
  const { product } = props
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    axios
      .post(
        "/products/relatedProducts",
        {category: product.category}
      )
      .then((res) => setRelatedProducts(res.data.data))
      .catch((err) => console.error(err));
  }, [product]);
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProduct;
