import React, { useState, useEffect, createRef } from "react";
import { getProducts, fetchProduct, deleteProduct } from "./api";
import "./styles/app.scss";
import ProductCard from "./components/Product/ProductCard";
import ProductItem from "./components/Product/ProductItem";
import EditProductCard from "./components/Product/EditProduct";

function App() {
  const [products, changeProducts] = useState([]);
  const [sortByColumn, changeSortByColumn] = useState({});
  const [productCard, changeProductCard] = useState(null);

  useEffect(() => {
    getProducts(changeProducts);
  }, []);

  const sort = (column, direction, arr = products) => () => {
    const newDirection = direction
      ? direction
      : sortByColumn[column] === "asc"
      ? "desc"
      : "asc";

    changeSortByColumn({ [column]: newDirection });

    const sortedProducts = arr.sort((a, b) => {
      if (newDirection === "asc") {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      } else {
        if (a[column] > b[column]) return -1;
        if (a[column] < b[column]) return 1;
        return 0;
      }
    });

    return [...sortedProducts];
  };

  const showProduct = id => () => {
    fetchProduct(id, changeProductCard);
  };

  const updateProducts = data => {
    const updatedProducts = products.filter(p => p.id !== data.id);
    const sortColumn = Object.keys(sortByColumn)[0];
    const withSort = sort(sortColumn, sortByColumn[sortColumn], [
      ...updatedProducts,
      data
    ]);

    changeProducts(withSort);
  };

  const updateProduct = editedProduct => () => {
    fetchProduct(editedProduct.id, changeProductCard, {
      method: "PUT",
      body: {
        name: editedProduct.name,
        price: editedProduct.price,
        code: editedProduct.code
      }
    });
    updateProducts(editedProduct);
  };

  const delProduct = () => {
    const removedProducts = products.filter(product => productCard.id !== product.id)
    deleteProduct(productCard.id, () => {
      changeProducts(removedProducts)
    })
    changeProductCard(null)
  }

  return (
    <div className="App">
      <header className="App-header"></header>

      <div className="content container">
        <h2>Products ({products.length})</h2>
        {products && (
          <table className="products">
            <thead>
              <tr>
                <th onClick={sort("id")} className={sortByColumn.id}>
                  ID
                </th>
                <th onClick={sort("name")} className={sortByColumn.name}>
                  Name
                </th>
                <th onClick={sort("code")} className={sortByColumn.code}>
                  Code
                </th>
                <th onClick={sort("price")} className={sortByColumn.price}>
                  Price
                </th>
                <th
                  onClick={sort("created_at")}
                  className={sortByColumn.created_at}
                >
                  Created
                </th>
                <th
                  onClick={sort("updated_at")}
                  className={sortByColumn.updated_at}
                >
                  Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <ProductItem
                  product={product}
                  key={product.id}
                  clickHandler={showProduct}
                />
              ))}
            </tbody>
          </table>
        )}

        {productCard && <ProductCard product={productCard} />}

        {productCard && (
          <EditProductCard
            key={productCard.id}
            product={productCard}
            updateProduct={updateProduct}
            deleteProduct={delProduct}
          />
        )}
      </div>
    </div>
  );
}

export default App;
