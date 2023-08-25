import React from "react";
import styles from "../UserProfile.module.css";

function ClientMessage() {
  return (
    <>
      <div className={styles.breadcrumb}>
        <h2 className={styles["page-title"]}>My Message</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>
    </>
  );
}

export default ClientMessage;
