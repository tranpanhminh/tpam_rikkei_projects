import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import styles from "../AdminPage.module.css";
import ManageSubscribers from "../partials/ManageSubscribers/ManageSubscribers";

function AdminSubscribersPage() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <ManageSubscribers />
      </main>
    </body>
  );
}

export default AdminSubscribersPage;
