import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import ManageUsers from "../partials/ManageUsers/ManageUsers";
import styles from "../AdminPage.module.css";
import ManageProducts from "../partials/ManageProducts/ManageProducts";

function AdminProductsPage() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <ManageProducts />
      </main>
    </body>
  );
}

export default AdminProductsPage;
