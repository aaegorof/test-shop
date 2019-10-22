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
  console.log(oldState);
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
  const [sortedProducts, sortProductsDispatch] = updateSortedTable(
    products,
    "price",
    false
  );
  const [productCard, changeProductCard] = useState(null);

  useEffect(() => {
    getProducts(changeProducts);
  }, []);

  useEffect(() => {
    sortProductsDispatch({ table: products });
  }, [products]);

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

  const showProduct = id => () => {
    fetchProduct(id, changeProductCard);
  };

  // const updateProducts = data => {
  //   const updatedProducts = products.filter(p => p.id !== data.id);
  //   const sortColumn = Object.keys(sortByColumn)[0];
  //   const withSort = sort(sortColumn, sortByColumn[sortColumn], [
  //     ...updatedProducts,
  //     data
  //   ]);
  //
  //   adjustFilter(withSort);
  // };

  // const filterProducts = string => {
  //    const newArray = products.filter( obj => {
  //     return (
  //       obj.name.toLowerCase().includes(string.toLowerCase()) ||
  //       obj.price === string ||
  //       obj.code.toLowerCase().includes(string.toLowerCase())
  //     );
  //   })
  //   updateFilter(string)
  //   adjustFilter(newArray)
  // }

  const updateProduct = editedProduct => () => {
    fetchProduct(editedProduct.id, changeProductCard, {
      method: "PUT",
      body: {
        name: editedProduct.name,
        price: editedProduct.price,
        code: editedProduct.code
      }
    });
    //updateProducts(editedProduct);
  };

  const delProduct = () => {
    const removedProducts = products.filter(
      product => productCard.id !== product.id
    );
    deleteProduct(productCard.id, () => {
      changeProducts(removedProducts);
    });
    changeProductCard(null);
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
                  <div onClick={sort("id")} className={sortClass("id")}>ID</div>
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
                  <div onClick={sort("price")} className={sortClass("price")}>Price</div>
                </th>
                <th>
                  <div onClick={sort("created_at")}
                       className={sortClass("created_at")}>Created</div>
                </th>
                <th>
                  <div onClick={sort("updated_at")}
                       className={sortClass("updated_at")}>Updated</div>
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
      </div>
    </div>
  );
}

export default App;
