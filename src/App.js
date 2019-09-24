import React, { useState, useEffect, createRef } from "react";
import { getProducts, fetchProduct } from "./api";
import "./styles/app.scss";
import Product, {ProductCard} from "./components/Product";

const url = "http://test-app.viktor.ws/api/products";

function App() {
  const [products, changeProducts] = useState([]);
  const [sortByColumn, changeSortByColumn] = useState({});
  const [productCard, changeProductCard] = useState(null)

  useEffect(() => {
    getProducts(url, changeProducts);
  }, []);

  useEffect(() => {}, [products]);

  const sortBy = column => () => {
    const newDirection = sortByColumn[column] === "asc" ? "desc" : "asc";

    changeSortByColumn({ [column]: newDirection });

    const sortedProducts = products.sort((a, b) => {
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

    changeProducts([...sortedProducts]);
  };

  const showProduct = id => () =>{
    fetchProduct(url+`/${id}`, changeProductCard)
  }

  const updateIt = (data) => {
    const updatedProducts = products.filter(p => p.id !== data.id)
    changeProducts([...updatedProducts, data]);
  }

  const putProduct = () => {
    fetchProduct(
      url + "/41",
      {
        method: "POST",
        body: {
          name: "Горох",
          price: 8,
          code: "3424-1423"
        }
      },
      updateIt
    );
  };

  return (
    <div className="App">
      <header className="App-header"></header>

      <div className="content container">
        <h2>Products</h2>
        {products && (
          <table className="products">
            <thead>
              <tr>
                <th onClick={sortBy("id")} className={sortByColumn.id}>
                  ID
                </th>
                <th onClick={sortBy("name")} className={sortByColumn.name}>
                  Name
                </th>
                <th onClick={sortBy("code")} className={sortByColumn.code}>
                  Code
                </th>
                <th onClick={sortBy("price")} className={sortByColumn.price}>
                  Price
                </th>
                <th
                  onClick={sortBy("created_at")}
                  className={sortByColumn.created_at}
                >
                  Created
                </th>
                <th
                  onClick={sortBy("updated_at")}
                  className={sortByColumn.updated_at}
                >
                  Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <Product product={product} key={product.id} clickHandler={showProduct}/>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={putProduct}>Update</button>

        {productCard && <ProductCard product={productCard}/>}
      </div>
    </div>
  );
}

export default App;
