import React, { useState, useEffect } from "react";
import "./product.scss";
import Input from "../Input/Input";

export const EditProductCard = ({ product, updateProduct, deleteProduct, addProduct }) => {
  const [editedProduct, updateEditedProduct] = useState(product);

  const updateField = name => val => {
    updateEditedProduct({
      ...editedProduct,
      [name]: val || 0
    });
  };

  return (
    <div className="product-card">
      <Input
        text="Name"
        value={editedProduct.name}
        onChange={updateField("name")}
      />

      <Input
        text="Code"
        value={editedProduct.code}
        onChange={updateField("code")}
      />

      <Input
        text="Price"
        value={editedProduct.price}
        onChange={updateField("price")}
      />

      {updateProduct && <button onClick={updateProduct(editedProduct)}>Update</button>}
      {deleteProduct && <button onClick={deleteProduct}>Delete</button>}
      {addProduct && <button onClick={addProduct(editedProduct)}>Add</button>}
    </div>
  );
};

export default EditProductCard;
