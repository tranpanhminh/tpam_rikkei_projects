import React, { useEffect, useState } from "react";
import DetailButtonProduct from "./Button/DetailProduct/DetailButtonProduct";
import { Button, notification } from "antd";
import { Product } from "../../../../database";
import axios from "axios";
import AddModalProduct from "../ManageProducts/Button/AddProduct/AddModalProduct";

import styles from "../../AdminPage.module.css";
import { NavLink } from "react-router-dom";

function ManageProducts() {
  document.title = "Manage Products | PetShop";

  const [products, setProducts] = useState<null | Product[]>(null);
  const [searchText, setSearchText] = useState<string>("");

  const fetchProducts = () => {
    axios
      .get("http://localhost:7373/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchProduct = () => {
    if (searchText === "") {
      // Nếu searchText rỗng, gọi lại fetchProducts để lấy tất cả người dùng
      fetchProducts();
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
              product.price.toString().includes(searchText.trim()) ||
              product.vendor
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              product.quantity_stock.toString().includes(searchText.trim())
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
        fetchProducts(); // Cập nhật lại dữ liệu products sau khi thêm
        notification.success({
          message: "Product Added",
          // placement: "bottomLeft",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDeleteProduct = (productId: number) => {
    axios
      .delete(`http://localhost:7373/products/${productId}`)
      .then(() => {
        fetchProducts(); // Cập nhật lại dữ liệu products sau khi xóa
        notification.success({
          message: "Product Deleted",
          // placement: "bottomLeft",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleUpdateProduct = () => {
    axios
      .get("http://localhost:7373/products")
      .then(() => {
        fetchProducts(); // Cập nhật lại dữ liệu users sau khi thêm
        notification.success({
          message: "Product Updated",
          // placement: "bottomLeft",
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
            id={styles["search-bar"]}
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
                  {/* <img src={product.productImage[0]} alt="" /> */}
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity_stock}</td>
                <td className={styles["group-btn-admin-manage-product"]}>
                  <NavLink to={`/products/${product.id}`} target="_blank">
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#0c337c" }}
                    >
                      View
                    </Button>
                  </NavLink>
                  <DetailButtonProduct
                    value="Detail"
                    title="Detail Product"
                    getProductId={product.id}
                    handleFunctionOk={handleUpdateProduct}
                  ></DetailButtonProduct>
                  <Button
                    type="primary"
                    className={styles["delete-product-btn"]}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
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
