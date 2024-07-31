import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom';

const Item = (props) => {
  // console.log(props._id)
  return (
    <div className="item" onClick={window.scrollTo(0,0)}>
      <Link to={`/product/${props.id}`} style={{all: "unset"}}>
        <img src={props.image} alt="" />

        <p>{props.name}</p>

        <div className="item-prices">
          <div className="item-price-new">${props.new_price}</div>
          <div className="item-price-old">${props.old_price}</div>
        </div>
      </Link>
    </div>
  );
}

export default Item