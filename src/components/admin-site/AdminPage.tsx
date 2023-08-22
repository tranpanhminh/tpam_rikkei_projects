import React from "react";
import AdminHeader from "./partials/AdminHeader/AdminHeader";

// Import CSS
import "../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import styles from "../admin-site/AdminPage.module.css";

import { initializeDatabase, Account, getDataFromLocal } from "../../database";

function AdminPage() {
  return (
    <>
      <AdminHeader></AdminHeader>
    </>
  );
}

export default AdminPage;
