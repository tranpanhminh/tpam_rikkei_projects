import React, { useEffect } from "react";
import styles from "../UserProfile.module.css";
import { Account } from "../../../../../database";
import { useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";

function ClientEditProfile() {
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNewPassword, setUserNewpassword] = useState("");
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  console.log(getLoginData);
  const [user, setUser] = useState<Account>({
    id: 0,
    email: "",
    fullName: "",
    password: "",
    role: "",
    status: "",
    cart: [],
    order_history: [],
    newsletter_register: false,
    newsletter: [],
    booking: [],
    booking_history: [],
  });

  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
        setUserFullName(response.data.fullName);
        setUserEmail(response.data.email);
        setUserPassword(response.data.password);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  console.log("User Fetch:", user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // Check if New Password is at least 8 characters
    if (userNewPassword && userNewPassword.length < 8) {
      notification.error({
        message: "Error",
        description: "New Password must be at least 8 characters.",
      });
      return;
    }

    // Check if both Old Password and New Password are provided
    if (!userPassword) {
      notification.error({
        message: "Error",
        description: "Please enter the Old Password.",
      });
      return;
    }

    // Check if Old Password matches the stored password
    if (userPassword !== user.password) {
      notification.error({
        message: "Error",
        description: "Old Password is incorrect.",
      });
      return;
    }

    const updatedUserData = {
      fullName: userFullName,
      password: userNewPassword || user.password, // Keep the same password if not changed
    };

    // Make PUT request to update user data
    axios
      .patch(`http://localhost:7373/accounts/${user.id}`, updatedUserData)
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        setIsModalOpen(false);
        notification.success({
          message: "Updated Profile",
        });
        fetchUser();
      })
      .catch((error) => {
        console.log("Error updating user data:", error);
      });
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
          <input type="text" disabled value={user.id} />
        </div>
        <div className={styles["my-profile-input-item"]}>
          <p>Full Name</p>
          <input disabled value={user.fullName} />
        </div>
        <div className={styles["my-profile-input-item"]}>
          <p>Email</p>
          <input type="text" disabled value={user.email} />
        </div>
        <div className={styles["my-profile-input-item"]}>
          <p>Status</p>
          <input type="text" disabled value={user.status} />
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
            <input
              value={userFullName}
              onChange={(event) => {
                setUserFullName(event?.target.value);
              }}
            />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Old Password</p>
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
