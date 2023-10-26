import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import styles from "../AdminPage.module.css";
import ManageServices from "../partials/ManageServices/ManageServices";

function AdminServicesPage() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <ManageServices />
      </main>
    </body>
  );
}

export default AdminServicesPage;
