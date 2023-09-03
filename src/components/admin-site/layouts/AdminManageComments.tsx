import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import styles from "../AdminPage.module.css";
import ManageComments from "../partials/ManageComments/ManageComments";

function AdminManageComments() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <ManageComments />
      </main>
    </body>
  );
}

export default AdminManageComments;
