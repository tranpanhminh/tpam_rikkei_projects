import React from "react";
import styles from "../ClientProfile.module.css";
function ClientEditProfile() {
  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Edit Profile</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>
    </>
  );
}

export default ClientEditProfile;
