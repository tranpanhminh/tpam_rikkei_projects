import React from "react";
import styles from "../../ClientPage.module.css";
import { NavLink } from "react-router-dom";

function ProductsServiceBreadCrumby() {
  return (
    <>
      <div className={styles["page-info"]}>
        <h2 className={styles["category-title"]}>Services</h2>
        <div className={styles["breadcrumb-page"]}>
          <NavLink to="/">Home</NavLink>
          <span> / </span>
          <NavLink to="/services">Services</NavLink>
        </div>
      </div>
    </>
  );
}

export default ProductsServiceBreadCrumby;
