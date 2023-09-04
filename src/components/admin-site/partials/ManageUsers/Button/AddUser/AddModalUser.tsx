import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../AddUser/AddModalUser.module.css";

import { Account } from "../../../../../../database";
import axios from "axios";

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

  const [newUser, setNewUser] = useState<Account>({
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

  const fetchUsers = () => {
    axios
      .get("http://localhost:7373/accounts")
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

  const maxId = users ? Math.max(...users.map((user) => user.id)) : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (
      newUser.fullName.trim() === "" ||
      newUser.email.trim() === "" ||
      newUser.role === "" ||
      newUser.status === "" ||
      newUser.password.trim() === "" ||
      newUser.password.length < 8 // Kiểm tra mật khẩu phải từ 8 ký tự trở lên
    ) {
      notification.warning({
        message: "Invalid information",
        description:
          "Please fill in all information and make sure password length > 8 characters",
      });
      return;
    }

    // Kiểm tra Email có tồn tại không
    const emailExists = users?.some((user) => user.email === newUser.email);
    if (emailExists) {
      notification.warning({
        message: "Email is exist",
        description: "Please use another Email.",
      });
      return;
    }

    // Kiểm tra tên không được chứa số hoặc ký tự đặc biệt
    const fullNamePattern = /^[a-zA-Z\s]*$/;
    if (!fullNamePattern.test(newUser.fullName)) {
      notification.warning({
        message: "Fullname is not valid",
        description:
          "First and last names cannot contain numbers or special characters.",
      });
      return;
    }

    // Kiểm tra định dạng Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newUser.email)) {
      notification.warning({
        message: "Email is not valid",
        description: "Email must be in the correct format.",
      });
      return;
    }

    const updatedUser = {
      ...newUser,
      id: maxId + 1,
    };

    const updatedUsers = users ? [...users, updatedUser] : null;

    setUsers(updatedUsers);
    // setDataToLocal("accountsDatabase", updatedUsers);
    setIsModalOpen(false);
    if (handleClickOk) {
      handleClickOk(updatedUser);
    }
    setNewUser({
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
            <p>User ID</p>
            <input type="text" value={maxId + 1} disabled />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Full Name</p>
            <input
              type="text"
              value={newUser.fullName}
              onChange={(e) =>
                setNewUser({ ...newUser, fullName: e.target.value })
              }
            />
          </div>
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
            <p>Password</p>
            <input
              type="text"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
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
          </div>
          <div className={styles["list-input-item"]}>
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddModalUser;
