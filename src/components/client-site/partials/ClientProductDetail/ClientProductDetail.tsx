import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import axios from "axios";
import { Product } from "../../../../database";
import { useParams } from "react-router-dom";

function ClientProductDetail() {
  const { productId } = useParams();

  const [products, setProducts] = useState<null | Product>(null);
  const fetchProducts = () => {
    axios
      .get(`http://localhost:7373/products/${productId}`)
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

  return (
    <>
      {products && (
        <div className={styles["product-detail"]}>
          <div
            className="container text-center"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <div className="row align-items-center">
              <div className="col-xl-8 col-sm-12">
                <div className="container text-center">
                  <div className="row row-cols-2">
                    <div className="col">
                      <img src={products && products.productImage[0]} alt="" />
                    </div>
                    <div className="col">
                      <img src={products && products.productImage[1]} alt="" />
                    </div>
                    <div className="col">
                      <img src={products && products.productImage[2]} alt="" />
                    </div>
                    <div className="col">
                      <img src={products && products.productImage[3]} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-sm-12">
                <div className={styles["product-detail-info"]}>
                  <h2 className={styles["product-title-name"]}>
                    {products && products.name}
                  </h2>
                  <p className={styles["product-description"]}>
                    {React.createElement("div", {
                      dangerouslySetInnerHTML: { __html: products.description },
                    })}
                  </p>
                  <div className={styles["product-price"]}>
                    <span>Price</span>
                    <span>${products && products.price.toLocaleString()}</span>
                  </div>
                  <div className={styles["product-vendor"]}>
                    <span>Vendor:</span>
                    <span>{products && products.vendor}</span>
                  </div>
                  <div className={styles["product-sku"]}>
                    <span>SKU:</span>
                    <span>{products && products.sku}</span>
                  </div>
                  <div className={styles["product-add-quantity"]}>
                    <p>Quantity:</p>
                    <input type="number" min="1" defaultValue={1} />
                  </div>
                  <button
                    className={styles["product-detail-page-add-to-cart-btn"]}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClientProductDetail;
