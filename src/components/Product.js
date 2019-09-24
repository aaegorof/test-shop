import React, {useState} from "react";
import "./product.scss";
import moment from "moment";

const Product = ({
  product: { id, name, code, price, created_at, updated_at },
    clickHandler
}) => {
  return (
    <tr className="product-item" onClick={clickHandler(id)}>
      <td className="id">{id}</td>
      <td className="name">{name}</td>
      <td className="code">{code}</td>
      <td className="price">{price}</td>
      <td className="created">{moment(created_at).format("DD/MM/YYYY")}</td>
      <td className="updated">{moment(updated_at).format("DD/MM/YYYY")}</td>
    </tr>
  );
};


export const ProductCard = ({product:{id, name, code, price, created_at, updated_at}}) => {

  return <div className="product-card">
    <h3>{name} <span className="id">id: {id}</span></h3>
    <div className="price"><div className="label">Price:</div>{price}</div>
    <div className="code"><span className="label">Code:</span>{code}</div>
    <div className="created"><span className="label">Created:</span>{moment(created_at).format("DD/MM/YYYY")}</div>
    <div className="updated"><span className="label">Updated:</span>{moment(updated_at).format("DD/MM/YYYY")}</div>
  </div>
}

export default Product;
