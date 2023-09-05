import React, { useEffect } from "react";
import styles from "../UserProfile.module.css";
import { Account } from "../../../../../database";
import { useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";

function ClientEditProfile() {
  const [userFullName, setUserFullName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState("");
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
    image_avatar: "",
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
      notification.warning({
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
      setUserFullName(userFullName);
    }

    // Kiểm tra Old Password
    if (oldPassword !== "" && oldPassword !== user.password) {
      console.log("UserPassword", oldPassword);
      console.log("user.password", user.password);
      notification.warning({
        message: "Old Password is not correct",
      });
      return;
    }
    // if (!newPassword) {
    //   notification.warning({
    //     message: "New Password must not be blank",
    //   });
    //   return;
    // }
    if (newPassword !== "" && newPassword.length < 8) {
      notification.warning({
        message: "Password must be at least 8 characters",
      });
      return false;
    }
    if (
      oldPassword !== "" &&
      newPassword !== "" &&
      newPassword === user.password
    ) {
      notification.warning({
        message: "New Password & Old password must not be the same",
      });
      return;
    } else {
      setNewPassword(user.password);
    }

    const updatedUserData = {
      fullName: userFullName,
      password: newPassword !== "" ? newPassword : user.password, // Keep the same password if not changed
      image_avatar: avatar !== "" ? avatar : user.image_avatar,
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
        // title="Edit Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles["list-input-my-profile"]}>
          <h6>Edit Profile (Optional)</h6>
          <div className={styles["my-profile-input-item"]}>
            <p>Full Name</p>
            <input
              value={userFullName}
              onChange={(event) => {
                setUserFullName(event?.target.value);
              }}
            />
          </div>{" "}
          <div className={styles["my-profile-input-item"]}>
            <p>Avatar</p>
            <input
              value={avatar}
              onChange={(event) => {
                setAvatar(event?.target.value);
              }}
            />
          </div>
          <h6>Change Password (Optional)</h6>
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
