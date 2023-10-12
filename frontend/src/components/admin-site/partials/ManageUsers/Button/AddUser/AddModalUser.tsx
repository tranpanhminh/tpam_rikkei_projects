import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../AddUser/AddModalUser.module.css";

import { Account } from "../../../../../../database";
import axios from "axios";

// Import API
// 1. Users API
const usersAPI = process.env.REACT_APP_API_USERS;

// ----------------------------------------------------

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  width?: number;
  handleClickOk?: (newUser: Account) => void;
}

const AddModalUser: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  width,
  handleClickOk,
}) => {
  const [users, setUsers] = useState<null | Account[]>(null);

  const [newUser, setNewUser] = useState<any>({
    email: "",
    full_name: "",
    password: "",
    rePassword: "",
  });

  const fetchUsers = () => {
    axios
      .get(`${usersAPI}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const maxId = users ? Math.max(...users.map((user) => user.id)) : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios
      .post(`${usersAPI}/add`, newUser)
      .then((response) => {
        notification.success({
          message: `Added Completed`,
        });
        setIsModalOpen(false);
        setNewUser({ email: "", full_name: "", password: "", rePassword: "" });
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
          </div>{" "}
          <div className={styles["list-input-item"]}>
            <p>Repassword</p>
            <input
              type="text"
              value={newUser.rePassword}
              onChange={(e) =>
                setNewUser({ ...newUser, rePassword: e.target.value })
              }
            />
          </div>
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
