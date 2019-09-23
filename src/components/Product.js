import React from "react";
import "./product.scss";
import moment from "moment";

const Product = ({
  product: { id, name, code, price, created_at, updated_at }
}) => {
  return (
    <tr className="product-item">
      <td className="id">{id}</td>
      <td className="name">{name}</td>
      <td className="code">{code}</td>
      <td className="price">{price}</td>
      <td className="created">{moment(created_at).format("DD/MM/YYYY")}</td>
      <td className="updated">{moment(updated_at).format("DD/MM/YYYY")}</td>
    </tr>
  );
};

export default Product;
