import React from "react";
import AdminHeader from "./../partials/AdminHeader/AdminHeader";
import ManageUsers from "./../partials/ManageUsers/ManageUsers";
import styles from "../AdminPage.module.css";

function AdminUsersPage() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <ManageUsers />
      </main>
    </body>
  );
}

export default AdminUsersPage;
