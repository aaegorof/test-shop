import React, { useState, useEffect } from "react";
import "./product.scss";
import Input from "../Input/Input";

export const EditProductCard = ({
  product,
  updateProduct,
                                  deleteProduct
}) => {
  const [editedProduct, updateEditedProduct] = useState(product);

  const {name, code, price } = product

  const updateField = name => val => {

    updateEditedProduct({
      ...editedProduct,
      [name] : val || 0
    });
  };



  return (
    <div className="product-card">
      <Input name="Name" value={editedProduct.name} onChange={ updateField("name")} />

      <Input name="Code" value={editedProduct.code} onChange={updateField("code")}/>

      <Input name="Price" value={editedProduct.price} onChange={updateField("price")}/>

      <button onClick={updateProduct(editedProduct)}>Update</button>
      <button onClick={deleteProduct}>Delete</button>
    </div>
  );
};

export default EditProductCard;
