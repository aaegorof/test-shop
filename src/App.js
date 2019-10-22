import React, { useState, useEffect, useReducer } from "react";
import { getProducts, fetchProduct, deleteProduct } from "./api";
import "./styles/app.scss";
import ProductCard from "./components/Product/ProductCard";
import ProductItem from "./components/Product/ProductItem";
import EditProductCard from "./components/Product/EditProduct";
import Input from "./components/Input/Input";
import { ascend, descend, prop, sort, filter as Rfilter } from "ramda";

function sortedTableReducer(oldState, newState) {
  const { table, isDesc, sortBy, filter } = { ...oldState, ...newState };
  const direction = isDesc ? descend : ascend;
  const sortFunc = sort(direction(prop(sortBy)));
  const sortedAndFilteredTable = Rfilter(
    item =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.code.toString().includes(filter.toLowerCase()) ||
      item.id.toString().includes(filter.toLowerCase()),
    sortFunc(table)
  );

  return { table: sortedAndFilteredTable, filter, sortBy, isDesc };
}

function updateSortedTable(table = [], sortBy, isDesc = true, filter = "") {
  const initialState = { isDesc, sortBy, table, filter };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(sortedTableReducer, initialState);

  return [state, dispatch];
}

function App() {
  const [products, changeProducts] = useState([]);
  const [productCard, changeProductCard] = useState(null);
  const [formProduct, updateFormProduct] = useState(null);
  const [sortedProducts, sortProductsDispatch] = updateSortedTable(
    products,
    "price",
    false
  );

  useEffect(() => {
    getProducts(changeProducts);
  }, []);

  useEffect(() => {
    sortProductsDispatch({ table: products });
  }, [products]);

  const showProduct = id => () => {
    fetchProduct(id, changeProductCard);
  };

  const updateProduct = editedProduct => () => {
    fetchProduct(editedProduct.id, changeProductCard, {
      method: "PUT",
      body: { ...editedProduct }
    });
    const newArr = [
      ...products.filter(i => i.id !== editedProduct.id),
      editedProduct
    ];
    changeProducts(newArr);
  };

  const showForm = () => {
    updateFormProduct({
      code: "",
      name: "",
      price: ""
    })
  }
const addProduct = product => () => {
  console.log(product);
  fetchProduct(null, (data) => changeProducts([...products,data]), {
    method: "POST",
    body: { ...product }
  });
}
  const delProduct = () => {
    const removedProducts = products.filter(
        product => productCard.id !== product.id
    );
    deleteProduct(productCard.id, () => {
      changeProducts(removedProducts);
    });
    changeProductCard(null);
  };

  const sort = column => () => {
    const direction =
      column === sortedProducts.sortBy ? !sortedProducts.isDesc : false;
    sortProductsDispatch({
      sortBy: column,
      isDesc: direction
    });
  };

  const sortClass = column => {
    if (column !== sortedProducts.sortBy) {
      return;
    }
    return sortedProducts.isDesc ? "desc" : "asc";
  };


  return (
    <div className="App">
      <header className="App-header"></header>

      <div className="content container">
        <h2>
          Products ({sortedProducts.table.length}/{products.length})
        </h2>
        <p>You can filter by name, code or ID. Start typing</p>
        <Input
          value={sortedProducts.filter}
          onChange={val =>
            sortProductsDispatch({ table: products, filter: val })
          }
        />
        {products && (
          <table className="products">
            <thead>
              <tr>
                <th>
                  <div onClick={sort("id")} className={sortClass("id")}>
                    ID
                  </div>
                </th>
                <th>
                  <div onClick={sort("name")} className={sortClass("name")}>
                    Name
                  </div>
                </th>
                <th>
                  <div onClick={sort("code")} className={sortClass("code")}>
                    Code
                  </div>
                </th>
                <th>
                  <div onClick={sort("price")} className={sortClass("price")}>
                    Price
                  </div>
                </th>
                <th>
                  <div
                    onClick={sort("created_at")}
                    className={sortClass("created_at")}
                  >
                    Created
                  </div>
                </th>
                <th>
                  <div
                    onClick={sort("updated_at")}
                    className={sortClass("updated_at")}
                  >
                    Updated
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.table.map(product => (
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

        <button onClick={showForm}>Add product</button>
        {formProduct && (
            <EditProductCard
                product={formProduct}
                addProduct={addProduct}
            />
        )}
      </div>
    </div>
  );
}

export default App;
