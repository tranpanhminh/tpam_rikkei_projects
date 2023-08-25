import React from "react";
import styles from "../UserProfile.module.css";
import { useState } from "react";
import { Button, Modal } from "antd";

function ClientEditProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>My Profile</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>

      <div className={styles["list-input-my-profile"]}>
        <div className={styles["my-profile-input-item"]}>
          <p>User ID</p>
          <input type="text" disabled />
        </div>
        <div className={styles["my-profile-input-item"]}>
          <p>Full Name</p>
          <input disabled />
        </div>
        <div className={styles["my-profile-input-item"]}>
          <p>Email</p>
          <input type="text" disabled />
        </div>
        <div className={styles["my-profile-input-item"]}>
          <p>Status</p>
          <input type="text" disabled />
        </div>
      </div>
      <br />
      <Button type="primary" onClick={showModal}>
        Edit Profile
      </Button>
      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles["list-input-my-profile"]}>
          <div className={styles["my-profile-input-item"]}>
            <p>Full Name</p>
            <input />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Email</p>
            <input type="text" />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Password</p>
            <input type="text" />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Repassword</p>
            <input type="text" />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>New Password</p>
            <input type="text" />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ClientEditProfile;
