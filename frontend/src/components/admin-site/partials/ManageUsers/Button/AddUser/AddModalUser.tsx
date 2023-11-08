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
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const result = await addUser(newUser);
    if (result) {
      setIsModalOpen(false);
      setNewUser({ email: "", full_name: "", password: "" });
      handleClickOk();
    }
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
        </div>
      </Modal>
    </>
  );
};

export default AddModalUser;
