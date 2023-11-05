import React, { useEffect, useState } from "react";
import DetailButtonProduct from "./Button/DetailProduct/DetailButtonProduct";
import { Button, Spin, message, notification } from "antd";
import { Product } from "../../../../database";
import axios from "axios";
import AddModalProduct from "../ManageProducts/Button/AddProduct/AddModalProduct";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../AdminPage.module.css";
import { NavLink } from "react-router-dom";
import BaseAxios from "../../../../api/apiAxiosClient";

// Import API
// 1. Products API
const productsAPI = process.env.REACT_APP_API_PRODUCTS;

// ------------------------------------------------
function ManageProducts() {
  document.title = "Manage Products | PetShop";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  // Fetch API
  const fetchProducts = () => {
    axios
      .get(`${productsAPI}`)
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
  // ------------------------------------------------

  // Handle Search
  const handleSearchProduct = () => {
    if (!searchText) {
      // Nếu searchText rỗng, gọi lại fetchProducts để lấy tất cả người dùng
      fetchProducts();
    } else {
      const filterProducts = products.filter((product: any) => {
        if (
          product?.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          product?.price.toString().includes(searchText.trim()) ||
          product?.vendor?.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          product?.quantity_stock.toString().includes(searchText.trim())
        ) {
          return true;
        }
        return false;
      });

      setProducts(filterProducts);
    }
  };
  // ------------------------------------------------

  // Handle Delete Product
  const handleDeleteProduct = (productId: number) => {
    messageApi.open({
      type: "loading",
      content: "Deleting...",
      duration: 0,
    });
    BaseAxios.delete(`${productsAPI}/delete/${productId}`)
      .then(() => {
        fetchProducts(); // Cập nhật lại dữ liệu products sau khi xóa
        messageApi.destroy();
        notification.success({
          message: "Product Deleted",
          // placement: "bottomLeft",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // ------------------------------------------------

  // Handle Update Product
  const handleUpdateProduct = () => {
    navigate("/admin/manage-products/");
    fetchProducts();
  };

  // ------------------------------------------------

  return (
    <div>
      {contextHolder}
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
          handleClickOk={handleUpdateProduct}
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
            {products?.map((product: any, index: number) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={product.thumbnail_url} alt="" />
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
