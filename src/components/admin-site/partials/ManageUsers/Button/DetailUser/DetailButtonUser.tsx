import React, { useState, ReactNode } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../DetailUser/DetailUserProfile.module.css";
import axios from "axios";
interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  content?: any;
  handleFunctionOk?: any;
  title?: string;
  // handleFunctionBtn?: any;
  getUser: any;
}
const DetailButtonUser: React.FC<DetailModalProps> = ({
  className,
  value,
  content,
  handleFunctionOk,
  // handleFunctionBtn,
  title,
  getUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState<any>("");
  const [oldPassword, setOldPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const [avatar, setAvatar] = useState<any>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // Kiểm tra Full Name
    if (name === "Super Admin") {
      notification.warning({
        message: "Error",
        description: "Don't set Name same to Super Admin",
      });
      return;
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
      notification.warning({
        message: "Full Name cannot contain special characters or numbers",
      });
      return false;
    } else {
      setName(name);
    }

    // Kiểm tra Old Password
    if (oldPassword !== "" && oldPassword !== getUser.password) {
      notification.warning({
        message: "Old Password is not correct",
      });
      return;
    }

    if (oldPassword !== "" && newPassword === "") {
      notification.warning({
        message: "Please fill New Password",
      });
      return;
    }

    if (newPassword !== "" && newPassword.length < 8) {
      notification.warning({
        message: "Password must be at least 8 characters",
      });
      return false;
    }

    if (
      oldPassword !== "" &&
      newPassword !== "" &&
      newPassword === getUser.password
    ) {
      notification.warning({
        message: "New Password & Old password must not be the same",
      });
      return;
    } else {
      setNewPassword(getUser.password);
    }

    const updatedUserData = {
      fullName: name !== "" ? name : getUser.fullName,
      password: newPassword !== "" ? newPassword : getUser.password, // Keep the same password if not changed
      image_avatar: avatar !== "" ? avatar : getUser.image_avatar,
    };

    // Make PUT request to update user data
    axios
      .patch(`http://localhost:7373/accounts/${getUser.id}`, updatedUserData)
      .then((response) => {
        notification.success({
          message: "Updated Profile",
        });
      })
      .catch((error) => {
        console.log("Error updating user data:", error);
      });
    handleFunctionOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className={className}>
        {value}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <div className={styles["list-input-add-student"]}>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Change User Information
          </span>
          <div className={styles["list-input-item"]}>
            <p>User ID</p>
            <input type="text" value={getUser.id} disabled />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Full Name</p>
            <input
              type="text"
              defaultValue={getUser.fullName}
              onChange={(event) => setName(event.target.value)}
              disabled={getUser.fullName === "Super Admin" ? true : false}
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Email</p>
            <input type="text" value={getUser.email} disabled />
          </div>{" "}
          <div className={styles["list-input-item"]}>
            <p>Avatar</p>
            <input
              type="text"
              defaultValue={getUser.image_avatar}
              onChange={(event) => {
                setAvatar(event.target.value);
              }}
            />
          </div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Change Password
          </span>
          <div className={styles["list-input-item"]}>
            <p>Old Password</p>
            <input
              type="text"
              onChange={(event) => {
                setOldPassword(event.target.value);
              }}
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>New Password</p>
            <input
              type="text"
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Role</p>
            <select name="role" disabled>
              <option value="" disabled>
                --Select Role--
              </option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div className={styles["list-input-item"]}>
            <p>Status</p>
            <select name="status" disabled>
              <option value="" disabled>
                --Select Status--
              </option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailButtonUser;
