import React from "react";
import UserHeader from "../../partials/ClientProfile/UserHeader";
import styles from "../../partials/ClientProfile/UserProfile.module.css";
import ClientOrder from "../../partials/ClientProfile/ClientOrder/ClientOrder";
function MyOrders() {
  return (
    <div className={styles["body-user-panel"]}>
      <UserHeader />
      <main>
        <ClientOrder />
      </main>
    </div>
  );
}

export default MyOrders;
