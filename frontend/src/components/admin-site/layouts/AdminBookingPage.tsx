import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import styles from "../AdminPage.module.css";
import ManageBooking from "../partials/ManageBooking/ManageBooking";

function AdminBookingPage() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <ManageBooking />
      </main>
    </body>
  );
}

export default AdminBookingPage;
