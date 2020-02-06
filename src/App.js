import React, { useState, useEffect, useReducer } from "react";
import { getProducts, fetchProduct, deleteProduct } from "./api";
import "./styles/app.scss";
import ProductCard from "./components/Product/ProductCard";
import ProductItem from "./components/Product/ProductItem";
import AddProductForm from "./components/Product/AddProductForm";
import Input from "./components/Input/Input";
import { ascend, descend, prop, sort, filter as Rfilter } from "ramda";
import { scrollTo } from "./helpers";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";

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
  const [addProductForm, updateFormProduct] = useState(null);
  const [sortedProducts, sortProductsDispatch] = updateSortedTable(
    products,
    "price",
    false
  );

  useEffect(() => {
    getProducts(changeProducts);
  }, []);

  const showProduct = id => () => {
    fetchProduct(id, changeProductCard);
    setTimeout(scrollTo(".product-card.edit"), 300);
  };

  const updateProduct = editedProduct => {
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

  const showForm = product => () => {
    const defaultForm = {
      name: "",
      price: "",
      code: ""
    };
    updateFormProduct({
      ...defaultForm,
      ...product
    });
  };

  const addProduct = product => {
    fetchProduct(null, data => changeProducts([...products, data]), {
      method: "POST",
      body: { ...product }
    });
    updateFormProduct(null);
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

      <div className="content container">
        <h2>
          Products ({sortedProducts.table.length}/{products.length})
          <button className="button" onClick={showForm()}>
            +
          </button>
        </h2>
        <p>
          You can filter by name, code or ID. Start typing.
          <br />
          You can sort the table by clicking on any column header.
        </p>
        <div className="flex">
          {products.length > 0 && (

              <div style={{margin: 20}}>
                <Table listArray={products} filteredKey="name" callback={val => console.log(val)}/>
              </div>
          )}

          <div className="add-product-wrap">
            {addProductForm && (
              <AddProductForm
                product={addProductForm}
                addProduct={addProduct}
                close={() => updateFormProduct(null)}
              />
            )}
          </div>
        </div>

        {productCard && (
          <ProductCard
            key={productCard.id}
            product={productCard}
            editMode={showForm}
            updateProduct={updateProduct}
            deleteProduct={delProduct}
            close={() => changeProductCard(null)}
          />
        )}
      </div>

    </div>
  );
}

export default App;
