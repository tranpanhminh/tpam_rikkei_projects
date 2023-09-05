import React, { useState, ReactNode } from "react";
import { Button, Modal } from "antd";
import styles from "../DetailUser/DetailUserProfile.module.css";
interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  content?: any;
  handleFunctionOk?: any;
  title?: string;
  handleFunctionBtn?: any;
  getUser: any;
}
const DetailButtonUser: React.FC<DetailModalProps> = ({
  className,
  value,
  content,
  handleFunctionOk,
  handleFunctionBtn,
  title,
  getUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState<any>("");
  const [oldPassword, setOldPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (handleFunctionOk) {
      handleFunctionOk();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleFunctionBtn || showModal}
        className={className}
      >
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
            <input type="text" value={getUser.fullName} />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Email</p>
            <input type="text" value={getUser.email} disabled />
          </div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Change Password
          </span>
          <div className={styles["list-input-item"]}>
            <p>Old Password</p>
            <input type="text" />
          </div>
          <div className={styles["list-input-item"]}>
            <p>New Password</p>
            <input type="text" />
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
