import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getBestSellingProducts } from "../../../../api/orderItems.api";
import { Badge } from "react-bootstrap";
import { getAllProducts } from "../../../../api/products.api";
import { Rate } from "antd";

// --------------------------------------------------------

function ClientFeaturedProducts() {
  const navigate = useNavigate();
  const [bestRatingProduct, setBestRatingProduct] = useState<any>([]);

  // const fetchSellingProduct = async () => {
  //   const result = await getBestSellingProducts();
  //   setBestSellingProduct(result);
  // };

  const fetchBestRatingProduct = async () => {
    const result = await getAllProducts();
    const sortProduct = result.sort((a: any, b: any) => {
      return b.avg_rating - a.avg_rating;
    });
    setBestRatingProduct(sortProduct);
  };

  useEffect(() => {
    fetchBestRatingProduct();
    // fetchSellingProduct();
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
            {bestRatingProduct &&
              bestRatingProduct?.slice(0, 4)?.map((product: any) => {
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
                        <NavLink to={`/products/${product.product_id}`}>
                          <h5 className={styles["product-title-name"]}>
                            {product && product.name}
                          </h5>
                        </NavLink>
                        <p className={styles["card-price"]}>
                          Price: ${product && product?.price?.toLocaleString()}
                        </p>
                        <p className={styles["card-price"]}>
                          <Rate disabled defaultValue={product?.avg_rating} />
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
        </div>
      </div>
    </>
  );
}

export default ClientFeaturedProducts;
