import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import styles from "../AdminPage.module.css";
import ManageCoupon from "../partials/ManageCoupon/ManageCoupons";

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
