import React, { useState } from "react";
import "./product.scss";
import Input from "../Input/Input";

export const AddProductForm = ({ product, addProduct, close }) => {
  const [editedProduct, updateEditedProduct] = useState(product);

  const updateField = name => val => {
    updateEditedProduct({
      ...editedProduct,
      [name]: val || 0
    });
  };

  return (
    <div className="product-card add-product-form">
      <button className="close-button" onClick={close}>x</button>
      <h3>Add a new product</h3>
      <div>
        <Input
            text="Name"
            value={editedProduct.name}
            onChange={updateField("name")}
        />
      </div>
      <div>
        <Input
            text="Code"
            value={editedProduct.code}
            placeholder="XXXX-XXXX"
            mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            onChange={updateField("code")}
        />
      </div>
      <div>
        <Input
            text="Price"
            value={editedProduct.price}
            onChange={updateField("price")}
        />
      </div>
      <div className="button-group">
        {addProduct && <button className="button" onClick={addProduct(editedProduct)}>Add</button>}
      </div>
    </div>
  );
};

export default AddProductForm;
