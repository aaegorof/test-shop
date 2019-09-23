import React, {useState, useEffect} from 'react';
import {getProducts} from "./api"
import "./styles/app.scss"
import Product from "./components/Product"

function App() {
  const url = "http://test-app.viktor.ws/api/products"
  const [products, changeProducts] = useState([])

  useEffect(() => {
    getProducts(url,changeProducts)
  },[])



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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Price</th>
                  <th>Created</th>
                  <th>Updated</th>
                </tr>
              </thead>
              {products.map(product => <Product product={product} key={product.id}/>)}
            </table>

        )}
      </div>
    </div>
  );
}

export default App;
