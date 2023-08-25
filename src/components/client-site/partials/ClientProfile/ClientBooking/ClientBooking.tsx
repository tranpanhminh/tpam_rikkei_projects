import React from "react";
import styles from "../UserProfile.module.css";
function ClientBooking() {
  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>My Booking</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>
    </>
  );
}

export default ClientBooking;
