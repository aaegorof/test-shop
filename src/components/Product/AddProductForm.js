import React, { useState } from "react";
import "./product.scss";
import Input from "../Input/Input";
import {isNil} from "ramda";

export const AddProductForm = ({ product, addProduct, close }) => {
  const [editedProduct, updateEditedProduct] = useState(product);

  const [errors, updateErrors] = useState({})

  const updateField = name => val => {
    updateEditedProduct({
      ...editedProduct,
      [name]: val || ""
    });
  };

  const priceValidate = (val) => /^\d+$/i.test(val)
  const codeValidate = (val) => /^(\d){4}-(\d){4}/.test(val)

  const validateForm = () => {
    const validMessages = {
      name: isNil(editedProduct.name) || !editedProduct.name?  "Required." :null,
      code: codeValidate(editedProduct.code) ? null: "Required. Should be in format XXXX-XXXX and only digits",
      price: priceValidate(editedProduct.price) ? null :"Required. Should be only digits"
    }
    console.log( editedProduct.name, codeValidate(editedProduct.code) , priceValidate(editedProduct.price));
      updateErrors(validMessages)
    /// if has no values
    if( Object.values(validMessages).every(x => isNil(x)) ) {
      addProduct(editedProduct)
    }
  }

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
        {errors.name}
      </div>
      <div>
        <Input
            text="Code"
            value={editedProduct.code}
            placeholder="XXXX-XXXX"
            mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            onChange={updateField("code")}
        />
        {errors.code}
      </div>
      <div>
        <Input
            text="Price"
            value={editedProduct.price}
            onChange={updateField("price")}
            validator={priceValidate}
        />
        {errors.price}
      </div>
      <div className="button-group">
        {addProduct && <button className="button" onClick={validateForm}>Add</button>}
      </div>
    </div>
  );
};

export default AddProductForm;
