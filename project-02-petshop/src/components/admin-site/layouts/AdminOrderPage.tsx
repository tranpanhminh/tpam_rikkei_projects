import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import styles from "../AdminPage.module.css";
import ManageOrders from "../partials/ManageOrders/ManageOrders";

function AdminOrderPage() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <ManageOrders />
      </main>
    </body>
  );
}

export default AdminOrderPage;
