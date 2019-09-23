import React from "react"
import "./product.scss"
import moment from "moment"


const Product = ({product}) => {

  return <tr className="product-item">
    <td className="id">{product.id}</td>
    <td className="name">{product.name}</td>
    <td className="code">{product.code}</td>
    <td className="price">{product.price}</td>
    <td className="created">{moment(product.created_at).format('DD/MM/YYYY')}</td>
    <td className="updated">{moment(product.updated_at).format('DD/MM/YYYY')}</td>
  </tr>
}

export default Product