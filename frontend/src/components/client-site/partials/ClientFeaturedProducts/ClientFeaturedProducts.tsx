import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import { Product } from "../../../../database";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

// Import API
const productsAPI = process.env.REACT_APP_API_PRODUCTS;
const orderItemsAPI = process.env.REACT_APP_API_ORDER_ITEMS;
// --------------------------------------------------------

function ClientFeaturedProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [bestSellingProduct, setBestSellingProduct] = useState<any>([]);

  const fetchProducts = async () => {
    await axios
      .get(`${productsAPI}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchSellingProduct = () => {
    axios
      .get(`${orderItemsAPI}/report`)
      .then((response) => {
        setBestSellingProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchSellingProduct();
  }, []);

  return (
    <>
      <div className={styles["list-products"]}>
        <div className={styles["group-title-category"]}>
          <h3 className={styles["headline-title-category"]}>For your pets!</h3>
          <p className={styles["headline-category"]}>Featured Products</p>
        </div>

        <div className="container text-center">
          <div
            className="row align-items-start"
            id="container-product-homepage"
          >
            {bestSellingProduct &&
              bestSellingProduct.slice(0, 4).map((product: any) => {
                return (
                  <div
                    className={`col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2 ${styles["product-card"]}`}
                  >
                    <div className={styles["card"]}>
                      <div className={styles["card-wrapper-top"]}>
                        <NavLink to={`/products/${product?.product_id}`}>
                          <img
                            src={product?.thumbnail_url}
                            className={styles["card-img-top"]}
                            alt="..."
                          />
                        </NavLink>
                        <NavLink to={`/products/${product?.product_id}`}>
                          <h5 className={styles["product-title-name"]}>
                            {product && product?.name}
                          </h5>
                        </NavLink>
                      </div>
                      <div className={styles["card-wrapper-bottom"]}>
                        <div className={styles["card-body"]}>
                          <p className={styles["card-price"]}>
                            Price: ${product && product?.price.toLocaleString()}
                          </p>
                        </div>
                        <div className={styles["card-foot"]}>
                          <button
                            onClick={() =>
                              navigate(`/products/${product?.product_id}`)
                            }
                            className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["detail-btn"]}`}
                          >
                            Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientFeaturedProducts;
