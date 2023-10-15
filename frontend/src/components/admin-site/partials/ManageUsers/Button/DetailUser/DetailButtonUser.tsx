import React, { useState, ReactNode, useEffect } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../DetailUser/DetailUserProfile.module.css";
import axios from "axios";

// Import API
const usersAPI = process.env.REACT_APP_API_USERS;

// -----------------------------------------------------------

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  content?: any;
  handleFunctionOk?: any;
  title?: string;
  // handleFunctionBtn?: any;
  getUserId: any;
}
const DetailButtonUser: React.FC<DetailModalProps> = ({
  className,
  value,
  content,
  handleFunctionOk,
  // handleFunctionBtn,
  title,
  getUserId,
}) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState<any>("");
  const [oldPassword, setOldPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const [avatar, setAvatar] = useState<any>("");
  const [user, setUser] = useState<any>({});
  // -----------------------------------------------------------
  // Fetch API
  const fetchUser = () => {
    axios
      .get(`${usersAPI}/detail/${getUserId}`)
      .then((response) => {
        console.log(response, "DDAA");
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  // -----------------------------------------------------------

  // Ẩn hiện Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // -----------------------------------------------------------

  // Handle Update User
  const handleOk = () => {
    handleFunctionOk();
    setIsModalOpen(false);
  };
  // -----------------------------------------------------------

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
            Change User Information (Optional)
          </span>
          {/* <div className={styles["list-input-item"]}>
            <p>User ID</p>
            <input type="text" value={user?.id} disabled />
          </div> */}
          <div className={styles["list-input-item"]}>
            <p>Full Name</p>
            <input
              type="text"
              defaultValue={user?.full_name}
              onChange={(event) => setName(event.target.value)}
            />
            
          </div>
          <div className={styles["list-input-item"]}>
            <p>Email</p>
            <input type="text" value={user?.email} disabled />
          </div>{" "}
          <div className={styles["list-input-item"]}>
            <p>Avatar</p>
            <input
              type="text"
              defaultValue={user?.image_avatar}
              onChange={(event) => {
                setAvatar(event.target.value);
              }}
            />
          </div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Change Password (Optional)
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
          {/* <div className={styles["list-input-item"]}>
            <p>Role</p>
            <select name="role" disabled>
              <option value="" disabled>
                --Select Role--
              </option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div> */}
          {/* <div className={styles["list-input-item"]}>
            <p>Status</p>
            <select name="status" disabled>
              <option value="" disabled>
                --Select Status--
              </option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div> */}
        </div>
      </Modal>
    </>
  );
};

export default DetailButtonUser;
