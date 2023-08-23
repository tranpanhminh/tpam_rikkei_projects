import React from "react";
import styles from "../DetailUser/DetailUserProfile.module.css";

export interface UserProfile {
  userId: number;
  fullName?: string;
  email?: string;
  role?: string;
  status?: string;
  feature?: string;
}

const UserProfile: React.FC<UserProfile> = ({
  userId,
  fullName,
  email,
  role,
  status,
  feature,
}) => {
  return (
    <div className={styles["list-input-add-student"]}>
      <div className={styles["list-input-item"]}>
        <p>User ID</p>
        <input type="text" disabled value={userId.toString()} />
        {feature === "Add User" || feature === "Detail" ? (
          ""
        ) : (
          <div className={styles["group-action-user-profile"]}>
            <i
              className={`fa-solid fa-pen-to-square  ${styles["edit-user-icon"]}`}
            ></i>
            <i
              className={`fa-solid fa-check  ${styles["update-user-icon"]}`}
            ></i>
          </div>
        )}
      </div>
      <div className={styles["list-input-item"]}>
        <p>Full Name</p>
        <input
          type="text"
          disabled={feature !== "Add User"}
          placeholder={fullName}
        />
        {feature === "Add User" || feature === "Detail" ? (
          ""
        ) : (
          <div className={styles["group-action-user-profile"]}>
            <i
              className={`fa-solid fa-pen-to-square  ${styles["edit-user-icon"]}`}
            ></i>
            <i
              className={`fa-solid fa-check  ${styles["update-user-icon"]}`}
            ></i>
          </div>
        )}
      </div>
      <div className={styles["list-input-item"]}>
        <p>Email</p>
        <input
          type="text"
          disabled={feature !== "Add User"}
          placeholder={email}
        />
        {feature === "Add User" || feature === "Detail" ? (
          ""
        ) : (
          <div className={styles["group-action-user-profile"]}>
            <i
              className={`fa-solid fa-pen-to-square  ${styles["edit-user-icon"]}`}
            ></i>
            <i
              className={`fa-solid fa-check  ${styles["update-user-icon"]}`}
            ></i>
          </div>
        )}
      </div>
      <div className={styles["list-input-item"]}>
        <p>Role</p>
        <select name="" id="" disabled={feature === "Detail"}>
          <option value="" selected disabled>
            --Select Role--
          </option>
          <option value="admin" selected={role === "admin"}>
            Admin
          </option>
          <option value="customer" selected={role === "customer"}>
            Customer
          </option>
        </select>
        {feature === "Add User" || feature === "Detail" ? (
          ""
        ) : (
          <div className={styles["group-action-user-profile"]}>
            <i
              className={`fa-solid fa-pen-to-square  ${styles["edit-user-icon"]}`}
            ></i>
            <i
              className={`fa-solid fa-check  ${styles["update-user-icon"]}`}
            ></i>
          </div>
        )}
      </div>
      <div className={styles["list-input-item"]}>
        <p>Status</p>
        <select name="" id="" disabled={feature === "Detail"}>
          <option value="" selected disabled>
            --Select Status--
          </option>
          <option value="active" selected={status === "Active"}>
            Active
          </option>
          <option value="inactive" selected={status === "Inactive"}>
            Inactive
          </option>
        </select>
      </div>
    </div>
  );
};

export default UserProfile;
