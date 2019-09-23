import React, {useState, useEffect, createRef} from 'react';
import {getProducts} from "./api"
import "./styles/app.scss"
import Product from "./components/Product"

function App() {
  const url = "http://test-app.viktor.ws/api/products"
  const [products, changeProducts] = useState([])
  const [sortByColumn, changeSortByColumn] = useState({})

  useEffect(() => {
    getProducts(url,changeProducts)
  },[])

  useEffect(() => {
  },[products])


  const sortBy = column => (e) => {
    const newDirection = sortByColumn[column] === "asc" ? "desc" : "asc"

    changeSortByColumn({[column]: newDirection})

    const sortedProducts = products.sort((a, b) => {
      if(newDirection === "asc") {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      } else {
        if (a[column] > b[column]) return -1;
        if (a[column] < b[column]) return 1;
        return 0;
      }
    })

    changeProducts([...sortedProducts])
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div className="content container">
        <h2>Products</h2>
        {products && (
            <table className="products">
              <thead>
                <tr>
                  <th onClick={sortBy("id")} className={sortByColumn.id}>ID</th>
                  <th onClick={sortBy("name")} className={sortByColumn.name}>Name</th>
                  <th onClick={sortBy("code")} className={sortByColumn.code}>Code</th>
                  <th onClick={sortBy("price")} className={sortByColumn.price}>Price</th>
                  <th>Created</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
              {products.map(product => <Product product={product} key={product.id}/>)}
              </tbody>
            </table>

        )}
      </div>
    </div>
  );
}

export default App;
