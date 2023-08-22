import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import DeleteButtonProduct from "./Button/DeleteProduct/DeleteButtonProduct";
import DetailButtonProduct from "./Button/DetailProduct/DetailButtonProduct";

import DetailModalProduct from "./Button/DetailProduct/DetailModalProduct";

import "../../AdminPage.css";

import {
  initializeDatabase,
  getDataFromLocal,
  setDataToLocal,
  Product,
} from "../../../../database"; // Import your data fetching and setting functions

function ManageProducts() {
  const [database, setDatabase] = useState(initializeDatabase());
  const [products, setProducts] = useState<Product[]>(
    getDataFromLocal<Product[]>("productsDatabase") || []
  );
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchProduct = () => {
    const productsDatabaseAdmin: Product[] = JSON.parse(
      localStorage.getItem("productsDatabase") || "[]"
    );

    const filterProduct = productsDatabaseAdmin.filter(function (product) {
      if (
        product.name.toLowerCase().includes(searchText.trim().toLowerCase()) ||
        product.price.toString().includes(searchText.trim().toLowerCase()) ||
        product.vendor
          .toLowerCase()
          .includes(searchText.trim().toLowerCase()) ||
        product.sku.toLowerCase().includes(searchText.trim().toLowerCase()) ||
        product.quantity_stock
          .toString()
          .includes(searchText.trim().toLowerCase())
      ) {
        return true;
      }
      return false;
    });

    setProducts(filterProduct);
  };

  const handleDeleteProduct = (productId: number) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);

    // Update localStorage with new user data
    setDataToLocal("productsDatabase", updatedProducts);
  };

  return (
    <div>
      <div className="breadcrumb">
        <h2 className="page-title">Manage Products</h2>
        <p className="page-description">PetShop Admin Panel</p>
      </div>

      <div className="product-panel">
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search-bar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id="search-btn"
            onClick={handleSearchProduct}
          >
            Search
          </button>
        </div>

        <button className="add-product-btn">Add Product</button>
      </div>

      <div className="search-result"></div>

      <div className="main-content">
        <h3 className="main-title-content">List Products</h3>
        <table className="table table-striped" id="table-products-manage-page">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={require(`../../../../assets/images/product-images/${product.productImage[0]}`)}
                    alt=""
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity_stock}</td>
                <td className="group-btn-admin-manage-product">
                  <DetailButtonProduct
                    value="Detail"
                    title="Detail Product"
                    className="detail-product-btn"
                    content={<DetailModalProduct productId={product.id} />}
                  ></DetailButtonProduct>
                  <DeleteButtonProduct
                    value="Delete"
                    className="delete-product-btn"
                    handleFunctionBtn={() => handleDeleteProduct(product.id)}
                  ></DeleteButtonProduct>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProducts;
