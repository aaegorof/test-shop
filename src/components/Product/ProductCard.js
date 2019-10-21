import React from "react";
import "./product.scss";
import moment from "moment";
import EditProductCard from "./EditProduct";
export const ProductCard = props => {
  const { id, name, code, price, created_at, updated_at } = props.product

  return (
    <div className="product-card">
      <h3>
        {name} <span className="id">id: {id}</span>
      </h3>
      <div className="price">
        <div className="label">Price:</div>
        {price}
      </div>
      <div className="code">
        <span className="label">Code:</span>
        {code}
      </div>
      <div className="created">
        <span className="label">Created:</span>
        {moment(created_at).format("DD/MM/YYYY")}
      </div>
      <div className="updated">
        <span className="label">Updated:</span>
        {moment(updated_at).format("DD/MM/YYYY")}
      </div>
    </div>
  );
};


export default ProductCard;
