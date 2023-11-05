import React, { useState } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../AddUser/AddModalUser.module.css";

import { addUser } from "../../../../../../api/users.api";

// ----------------------------------------------------

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  width?: number;
  handleClickOk?: any;
}

const AddModalUser: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  width,
  handleClickOk,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<any>({
    email: "",
    full_name: "",
    password: "",
    // rePassword: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await addUser(newUser)
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        setIsModalOpen(false);
        setNewUser({ email: "", full_name: "", password: "" });
        handleClickOk();
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className={styles[`${className}`]}
      >
        {value}
      </Button>
      <Modal
        title={title}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={width}
      >
        <div className={styles["list-input-add-student"]}>
          <div className={styles["list-input-item"]}>
            <p>Email</p>
            <input
              type="text"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Full Name</p>
            <input
              type="text"
              value={newUser.full_name}
              onChange={(e) =>
                setNewUser({ ...newUser, full_name: e.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Password</p>
            <input
              type="text"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </div>
          {/* <div className={styles["list-input-item"]}>
            <p>Repassword</p>
            <input
              type="text"
              value={newUser.rePassword}
              onChange={(e) =>
                setNewUser({ ...newUser, rePassword: e.target.value })
              }
            />
          </div> */}
          {/* <div className={styles["list-input-item"]}>
            <p>Role</p>
            <select
              name="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="" disabled>
                --Select Role--
              </option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div> */}
          {/* <div className={styles["list-input-item"]}>
            <p>Status</p>
            <select
              name="status"
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
            >
              <option value="" disabled>
                --Select Status--
              </option>
              <option value={1}>Active</option>
              <option value={2}>Inactive</option>
            </select>
          </div> */}
        </div>
      </Modal>
    </>
  );
};

export default AddModalUser;
