import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import styles from "../AdminPage.module.css";
import ManageCoupon from "../partials/ManageCoupon/ManageCoupon";

function AdminCouponPage() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <ManageCoupon />
      </main>
    </body>
  );
}

export default AdminCouponPage;
