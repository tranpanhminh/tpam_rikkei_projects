import React from "react";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css"
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
