import React, { useState } from "react";
import styles from "../../ClientPage.module.css";
import {
  initProductsDatabase,
  getDataFromLocal,
  setDataToLocal,
  Product,
} from "../../../../database";

function ClientFeaturedProducts() {
  const [productsDatabase, setProductsDatabase] =
    useState(initProductsDatabase);
  const [products, setProducts] = useState<Product[]>(
    getDataFromLocal("productsDatabase") || []
  );

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
            {products.map((product) => {
              return (
                <div
                  className={`col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2 ${styles["product-card"]}`}
                >
                  <div className={styles["card"]}>
                    <img
                      src={require(`../../../../assets/images/product-images/${product.productImage[0]}`)}
                      className={styles["card-img-top"]}
                      alt="..."
                    />
                    <div className={styles["card-body"]}>
                      <h5 className={styles["product-title-name"]}>
                        {product.name}
                      </h5>
                      <p className={styles["card-price"]}>
                        Price: ${product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className={styles["card-foot"]}>
                      <button
                        type="button"
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
