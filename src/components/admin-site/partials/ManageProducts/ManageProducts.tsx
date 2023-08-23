import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import DeleteButtonProduct from "./Button/DeleteProduct/DeleteButtonProduct";
import DetailButtonProduct from "./Button/DetailProduct/DetailButtonProduct";
import DetailModalProduct from "./Button/DetailProduct/DetailModalProduct";

import { Product } from "../../../../database";
import axios from "axios";
import AddModalProduct from "../ManageProducts/Button/AddProduct/AddModalProduct";

import styles from "../../AdminPage.module.css";
import { notification } from "antd";

function ManageProducts() {
  const [products, setProducts] = useState<null | Product[]>(null);
  const [searchText, setSearchText] = useState<string>("");

  const fetchUsers = () => {
    axios
      .get("http://localhost:7373/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchProduct = () => {
    if (searchText === "") {
      // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
      fetchUsers();
    } else {
      // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
      axios
        .get(`http://localhost:7373/products`)
        .then((response) => {
          // Lấy dữ liệu từ response
          const allProducts = response.data;

          // Tìm kiếm trong dữ liệu và cập nhật state
          const filterProducts = allProducts.filter((product: Product) => {
            if (
              product.name
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              product.price
                .toString()
                .includes(searchText.trim().toLowerCase()) ||
              product.vendor
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              product.sku
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              product.quantity_stock
                .toString()
                .includes(searchText.trim().toLowerCase())
            ) {
              return true;
            }
            return false;
          });

          setProducts(filterProducts);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    axios
      .post("http://localhost:7373/products", newProduct)
      .then(() => {
        fetchUsers(); // Cập nhật lại dữ liệu users sau khi thêm
        notification.success({
          message: "Product Added",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Products</h2>
        <p className={styles["page-description"]}>PetShop Admin Panel</p>
      </div>

      <div className={styles["product-panel"]}>
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
            id={styles["search-btn"]}
            onClick={handleSearchProduct}
          >
            Search
          </button>
        </div>

        <AddModalProduct
          className={styles["add-product-btn"]}
          value="Add Product"
          title="Add Product"
          handleClickOk={handleAddProduct}
        />
      </div>

      <div className={styles["search-result"]}></div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Products</h3>
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
            {products?.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={product.productImage[0]} alt="" />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity_stock}</td>
                <td className={styles["group-btn-admin-manage-product"]}>
                  <DetailButtonProduct
                    value="Detail"
                    title="Detail Product"
                    className={styles["detail-product-btn"]}
                    content={<DetailModalProduct productId={product.id} />}
                  ></DetailButtonProduct>
                  <DeleteButtonProduct
                    value="Delete"
                    className={styles["delete-product-btn"]}
                    // handleFunctionBtn={() => handleDeleteProduct(product.id)}
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
