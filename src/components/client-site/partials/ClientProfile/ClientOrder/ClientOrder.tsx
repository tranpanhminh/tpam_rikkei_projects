import React from "react";
// Import CSS
import styles from "../UserProfile.module.css";
function ClientOrder() {
  return (
    <div>
      <div className={styles.breadcrumb}>
        <h2 className={styles["page-title"]}>My Order</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>
    </div>
  );
}

export default ClientOrder;
