import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import styles from "../AdminPage.module.css";
import { Outlet } from "react-router-dom";

function AdminMainPage() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </body>
  );
}

export default AdminMainPage;
