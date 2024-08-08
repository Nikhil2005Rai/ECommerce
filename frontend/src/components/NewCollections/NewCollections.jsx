import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "./../Item/Item";
import axios from "axios";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
  useEffect(() => {
    axios
      .get("/products/newCollections")
      .then((res) => setNewCollection(res.data.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((item, i) => (
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

export default NewCollections;
