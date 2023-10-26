import React from "react";
import UserHeader from "../partials/ClientProfile/UserHeader";
import styles from "../partials/ClientProfile/UserProfile.module.css";
import { Outlet } from "react-router-dom";

function ClientMainPage() {
  return (
    <div className={styles["body-user-panel"]}>
      <UserHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default ClientMainPage;
