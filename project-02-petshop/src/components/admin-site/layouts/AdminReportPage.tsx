import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import styles from "../AdminPage.module.css";
import Report from "../partials/Report/Report";

function AdminReportPage() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <Report />
      </main>
    </body>
  );
}

export default AdminReportPage;
