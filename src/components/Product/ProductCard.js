import React, { useState } from "react";
import "./product.scss";
import moment from "moment";
import Input from "../Input/Input";
export const ProductCard = props => {
  const { id, created_at, updated_at } = props.product;
  const {updateProduct, deleteProduct, close} = props
  const [editedProduct, updateEditedProduct] = useState(props.product);

  const updateField = name => val => {
    updateEditedProduct({
      ...editedProduct,
      [name]: val || 0
    });
  };
  const  [editMode, changeMode] = useState(false);

  return (
    <div className="product-card">
      <button className="close-button" onClick={close}>x</button>
      <div className="flex">
        <h3>
          <span className="id">id: {id}</span>
          <Input value={editedProduct.name} disabled={!editMode} onChange={updateField("name")}/>
        </h3>
        <div className="price">
          <div className="label">Price:</div>
          <Input value={editedProduct.price} disabled={!editMode} onChange={updateField("price")}/>
        </div>
      </div>
      <div className="code">
        <span className="label">Code:</span>
        <Input value={editedProduct.code} disabled={!editMode} onChange={updateField("code")} mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}/>
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
        {updateProduct && editMode && <button className="button" onClick={updateProduct(editedProduct)}>Update</button>}
        {deleteProduct && <button className="button danger" onClick={deleteProduct}>Delete</button>}
      </div>

    </div>
  );
};

export default ProductCard;
