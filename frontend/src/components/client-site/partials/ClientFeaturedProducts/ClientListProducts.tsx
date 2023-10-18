import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import { Product } from "../../../../database";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Pagination } from "antd";

// Import API
const productsAPI = process.env.REACT_APP_API_PRODUCTS;
// ------------------------------------------------------------------

function ClientListProducts() {
  document.title = "Products | PetShop";

  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<any>([]);
  const [page, setPage] = useState<any>(1); // Đặt giá trị mặc định cho page
  const [postPerPage, setPostPerPage] = useState<any>(8);
  const [total, setTotal] = useState<any>("");

  const fetchProducts = () => {
    axios
      .get(`${productsAPI}`)
      .then((response) => {
        // setProducts(response.data);
        setPosts(response.data);
        setTotal(response.data.length);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);
  const onShowSizeChange = (current: any, pageSize: any) => {
    setPostPerPage(pageSize);
  };

  let listPage: any = [];
  for (let i = 1; i < Math.ceil(total / postPerPage); i++) {
    listPage.push(i);
  }
  
  const handlePageChange = (value: number) => {
    setPage(value); // Cập nhật trang hiện tại
    window.scrollTo(0, 0);
    // window.history.replaceState({}, "", `/blogs/page/${value}`);
  };

  const itemRender = (current: any, type: any, originalElement: any) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <>
      <div
        className={styles["list-products"]}
        style={{ marginTop: 0, marginBottom: 100 }}
      >
        <div className="container text-center">
          <div
            className="row align-items-start"
            id="container-product-homepage"
          >
            {currentPosts &&
              currentPosts.map((product: any) => {
                return (
                  <div
                    className={`col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2 ${styles["product-card"]}`}
                  >
                    <div className={styles["card"]}>
                      <NavLink to={`/products/${product.id}`}>
                        <img
                          src={product.thumbnail_url}
                          className={styles["card-img-top"]}
                          alt="..."
                        />
                      </NavLink>
                      <div className={styles["card-body"]}>
                        <NavLink to={`/products/${product.id}`}>
                          <h5 className={styles["product-title-name"]}>
                            {product && product.name}
                          </h5>
                        </NavLink>
                        <p className={styles["card-price"]}>
                          Price: ${product && product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className={styles["card-foot"]}>
                        <button
                          onClick={() => navigate(`/products/${product.id}`)}
                          className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["detail-btn"]}`}
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div style={{ marginTop: "50px" }}>
            <Pagination
              pageSize={postPerPage}
              total={total}
              current={page} // Sử dụng page để xác định trang hiện tại
              onChange={handlePageChange} // Sử dụng handlePageChange để cập nhật trang
              showSizeChanger
              showQuickJumper
              onShowSizeChange={onShowSizeChange}
              itemRender={itemRender}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientListProducts;
