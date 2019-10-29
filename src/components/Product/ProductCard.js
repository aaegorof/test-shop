import React, { useState } from "react";
import "./product.scss";
import moment from "moment";
import Input from "../Input/Input";
import { codeValidate, priceValidate } from "../../helpers";
import { isNil } from "ramda";
export const ProductCard = props => {
  const { id, created_at, updated_at } = props.product;
  const {updateProduct, deleteProduct, close} = props
  const [editedProduct, updateEditedProduct] = useState(props.product);
  const  [editMode, changeMode] = useState(false);
  const [errors, updateErrors] = useState({});

  const validateForm = () => {
    const validMessages = {
      name:
          isNil(editedProduct.name) || !editedProduct.name ? "Required." : null,
      code: codeValidate(editedProduct.code)
          ? null
          : "Required. Should be in format XXXX-XXXX and only digits",
      price: priceValidate(editedProduct.price)
          ? null
          : "Required. Should be only digits"
    };

    updateErrors(validMessages);

    /// if Error Obj has no values
    if (Object.values(validMessages).every(x => isNil(x))) {
      updateProduct(editedProduct);
    }
  };
  const updateField = name => val => {
    updateEditedProduct({
      ...editedProduct,
      [name]: val || ""
    });
  };

  return (
    <div className="product-card edit">
      <button className="close-button" onClick={close}><span>x</span></button>
      <div className="flex">
        <h3>
          <span className="id">id: {id}</span>
          <Input value={editedProduct.name} disabled={!editMode} onChange={updateField("name")}/>
          <div className="error">{errors.name}</div>
        </h3>
        <div className="price">
          <div className="label">Price:</div>
          <Input value={editedProduct.price} disabled={!editMode} onChange={updateField("price")} validator={priceValidate}/>
          <div className="error">{errors.price}</div>
        </div>
      </div>
      <div className="code">
        <span className="label">Code:</span>
        <Input value={editedProduct.code} disabled={!editMode} onChange={updateField("code")} mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}/>
        <div className="error">{errors.code}</div>
      </div>
      <div className="created">
        <span className="label">Created:</span>
        {moment(created_at).format("DD/MM/YYYY")}
      </div>
      <div className="updated">
        <span className="label">Updated:</span>
        {moment(updated_at).format("DD/MM/YYYY")}
      </div>
      <div className="button-group">
        {!editMode && (
            <button className="button" onClick={() => changeMode(!editMode)}>
              Edit
            </button>
        )}
        {updateProduct && editMode && <button className="button" onClick={validateForm}>Update</button>}
        {deleteProduct && <button className="button danger" onClick={deleteProduct}>Delete</button>}
      </div>

    </div>
  );
};

export default ProductCard;
