import React from "react";
import styles from "../../ClientPage.module.css";
import { NavLink } from "react-router-dom";

function ProductsCategoryBreadcrumb() {
  return (
    <>
      <div className={styles["page-info"]}>
        <h2 className={styles["category-title"]}>Products</h2>
        <div className={styles["breadcrumb-page"]}>
          <NavLink to="/">Home</NavLink>
          <span> / </span>
          <NavLink to="/products">Products</NavLink>
        </div>
      </div>
    </>
  );
}

export default ProductsCategoryBreadcrumb;
