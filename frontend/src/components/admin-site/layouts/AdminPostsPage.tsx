import React from "react";
import AdminHeader from "../partials/AdminHeader/AdminHeader";
import styles from "../AdminPage.module.css";
import ManagePosts from "../partials/ManagePosts/ManagePosts";

function AdminPostsPage() {
  return (
    <body className={styles["main-body"]}>
      <AdminHeader />
      <main>
        <ManagePosts />
      </main>
    </body>
  );
}

export default AdminPostsPage;
