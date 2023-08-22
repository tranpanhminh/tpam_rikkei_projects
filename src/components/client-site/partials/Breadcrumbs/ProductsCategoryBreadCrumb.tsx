import React from "react";
import styles from "../../ClientPage.module.css";

function ProductsCategoryBreadCrumb() {
  return (
    <>
      <div className={styles["page-info"]}>
        <h2 className={styles["category-title"]}>Products</h2>
        <div className={styles["breadcrumb-page"]}>
          <a href="./index.html">Home</a>
          <span> / </span>
          <a href="./products-category.html">Products</a>
        </div>
      </div>
    </>
  );
}

export default ProductsCategoryBreadCrumb;
