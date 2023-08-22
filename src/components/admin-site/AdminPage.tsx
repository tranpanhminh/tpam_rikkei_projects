import React from "react";
import AdminHeader from "./partials/AdminHeader/AdminHeader";

// Import CSS
import "../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import "../admin-site/AdminPage.css";

import { initializeDatabase, Account, getDataFromLocal } from "../../database";

function AdminPage() {
  return (
    <div className="body">
      <AdminHeader></AdminHeader>
    </div>
  );
}

export default AdminPage;
