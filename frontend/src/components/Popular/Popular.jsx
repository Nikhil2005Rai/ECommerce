import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import axios from "axios";
const Popular = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/products/popularInWomen")
      .then((res) => setPopular(res.data.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popular.map((item, i) => (
          <Item
            key={i}
            id={item._id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
