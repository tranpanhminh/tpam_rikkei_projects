import React, { useEffect } from "react";
import styles from "../UserProfile.module.css";
import { Account } from "../../../../../database";
import { useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";

function ClientEditProfile() {
  const [userFullName, setUserFullName] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
    booking_history: [],
  });

  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
        setUserFullName(response.data.fullName);
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
    // Kiểm tra Full Name

    if (!userFullName) {
      notification.error({
        message: "Error",
        description: "Please Enter Full Name",
      });
      return;
    } else if (!/^[a-zA-Z\s]*$/.test(userFullName)) {
      notification.warning({
        message: "Full Name cannot contain special characters or numbers",
      });
      return false;
    } else {
      setNewFullName(userFullName);
    }

    // Kiểm tra Old Password
    if (oldPassword !== user.password) {
      console.log("UserPassword", oldPassword);
      console.log("user.password", user.password);
      notification.warning({
        message: "Old Password is not correct",
      });
      return;
    }
    if (!newPassword) {
      notification.warning({
        message: "New Password must not be blank",
      });
      return;
    }
    if (newPassword.length < 8) {
      notification.warning({
        message: "Password must be at least 8 characters",
      });
      return false;
    }
    if (newPassword === user.password) {
      notification.warning({
        message: "New Password & Old password must not be the same",
      });
      return;
    } else {
      setNewPassword(user.password);
    }

    const updatedUserData = {
      fullName: newFullName,
      password: newPassword, // Keep the same password if not changed
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
        setUserFullName("");
        setOldPassword("");
        setNewPassword("");
        fetchUser();
      })
      .catch((error) => {
        console.log("Error updating user data:", error);
      });
  };

  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
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
            <input
              type="password"
              value={oldPassword}
              onChange={(event) => {
                setOldPassword(event?.target.value);
              }}
            />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>New Password</p>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event?.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ClientEditProfile;
