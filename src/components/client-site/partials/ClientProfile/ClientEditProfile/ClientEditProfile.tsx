import React from "react";
import styles from "../ClientProfile.module.css";
function ClientEditProfile() {
  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Edit Profile</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>

      <div className="col-12 right-cart" id={styles["user-info-summary"]}>
        <h2 className="cart-title">User Info</h2>

        <div className={styles["cart-shipping"]}>
          <h4 className={styles["cart-shipping-title"]}>User ID</h4>
          <input type="text" placeholder="" />
        </div>

        <div className={styles["cart-shipping"]}>
          <h4 className={styles["cart-shipping-title"]}>Email</h4>
          <input type="text" placeholder="" />
        </div>

        <div className={styles["cart-shipping"]}>
          <h4 className={styles["cart-shipping-title"]}>Name</h4>
          <input type="text" placeholder="" />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          id={styles["edit-user-btn"]}
          data-bs-toggle="modal"
          data-bs-target="#detailUser"
        >
          Edit User
        </button>
      </div>
    </>
  );
}

export default ClientEditProfile;
