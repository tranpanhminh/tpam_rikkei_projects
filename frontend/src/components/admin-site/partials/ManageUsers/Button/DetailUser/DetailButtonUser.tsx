import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, message, notification } from "antd";
import styles from "../DetailUser/DetailUserProfile.module.css";
import {
  changeUserPassword,
  getDataLogin,
  changeUserAvatar,
  changeUserName,
} from "../../../../../../api/users.api";

// -----------------------------------------------------------

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  content?: any;
  handleFunctionOk?: any;
  title?: string;
  getUserId: any;
}
const DetailButtonUser: React.FC<DetailModalProps> = ({
  className,
  value,
  handleFunctionOk,
  title,
}) => {
  // States
  const socket = io(`${process.env.REACT_APP_BACK_END}`);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [avatar, setAvatar] = useState<any>("");
  const [name, setName] = useState("");
  const [user, setUser] = useState<any>({});
  const [image, setImage] = useState<any>("");
  const [show, setShow] = useState<boolean>(false);
  const [userPassword, setUserPassword] = useState<any>({
    old_password: "",
    new_password: "",
  });

  // -----------------------------------------------------------
  // Fetch API
  const fetchUser = async () => {
    const user = await getDataLogin();
    return setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  // -----------------------------------------------------------

  // Ẩn hiện Modal
  const showModal = () => {
    navigate("/admin/?edit-user");
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setName("");
    setUserPassword({
      oldPassword: "",
      newPassword: "",
    });
    resetInputImage();
    setIsModalOpen(false);
  };

  // -----------------------------------------------------------

  // Handle Update Password
  const handleOk = async () => {
    const result = await changeUserPassword(user.id, userPassword);
    if (result) {
      setUserPassword({
        old_password: "",
        new_password: "",
      });
      handleFunctionOk();
      localStorage.clear();
      navigate("/");
      setIsModalOpen(false);
    }
  };

  // -----------------------------------------------------------
  const showButton = () => {
    setShow(true);
  };

  // Handle Update Name
  const handleChangeName = async () => {
    const userInfo = {
      full_name: name,
    };
    const result = await changeUserName(user.id, userInfo);
    console.log(result);

    if (result) {
      fetchUser();
      setShow(false);
      handleFunctionOk();
      navigate("/admin/");
      socket.emit("updateAdminName");
    }
  };

  // -----------------------------------------------------------

  // Handle Change Avatar

  const fileInputRef = useRef<any>(null);
  const resetInputImage = () => {
    if (image) {
      setAvatar("");
    }
    setImage(null);
    fileInputRef.current.value = null; // Đặt giá trị về null
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (!event.target.files[0].type.includes("image")) {
      fileInputRef.current.value = null; // Đặt giá trị về null
      return notification.warning({
        message: "Only file type Image is accepted",
      });
    }
    if (selectedFile && event.target.files[0].type.includes("image")) {
      const imageURL: any = URL.createObjectURL(selectedFile);
      setImage(imageURL);
    }

    setAvatar(event.target.files[0]);
  };

  const changeAvatar = async () => {
    const formData: any = new FormData();
    formData.append("image_avatar", avatar);
    formData.append("_method", "PATCH");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (avatar) {
      messageApi.open({
        type: "loading",
        content: "Updating...",
        duration: 0,
      });
    }
    await changeUserAvatar(user.id, formData, config)
      .then((response) => {
        messageApi.destroy();
        handleFunctionOk();
        socket.emit("updateAvatar");
        resetInputImage();
        fetchUser();
        navigate("/admin/");
        socket.emit("updateAdminAvatar");
        setShow(false);
      })
      .catch((error) => {
        notification.error({
          message: `${error.response.data.message}`,
        });
      });
  };

  // -----------------------------------------------------------

  return (
    <>
      {contextHolder}
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
          {image ? (
            <img src={image} alt="" className={styles["user-avatar"]} />
          ) : (
            <img
              src={user.image_avatar}
              alt=""
              className={styles["user-avatar"]}
            />
          )}
          <div className={styles["list-input-item"]}>
            <p>Email</p>
            <input type="text" value={user?.email} disabled />
            <i
              className="fa-solid fa-pen-to-square"
              style={{ color: "white" }}
            ></i>
          </div>
          <div className={styles["list-input-item"]}>
            <p>Full Name</p>
            <input
              type="text"
              disabled={show === false ? true : false}
              defaultValue={user?.full_name}
              onChange={(event) => setName(event.target.value)}
            />
            <i
              className={`fa-solid fa-pen-to-square  ${styles["fa-btn"]}`}
              style={{
                display: show === false ? "inline-block" : "none",
              }}
              onClick={showButton}
            ></i>
            <i
              className={`fa-solid fa-check  ${styles["fa-btn"]}`}
              style={{
                display: show === true ? "inline-block" : "none",
              }}
              onClick={handleChangeName}
            ></i>
          </div>

          <div className={styles["list-input-item"]}>
            <p>Avatar</p>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              id="thumbnail"
              ref={fileInputRef}
            />
            <i
              className={`${
                image ? "fa-solid fa-check" : "fa-solid fa-pen-to-square"
              } ${styles["fa-btn"]}`}
              onClick={image ? changeAvatar : undefined}
            ></i>
          </div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Change Password (Optional)
          </span>
          <div className={styles["list-input-item"]}>
            <p>Old Password</p>
            <input
              type="password"
              value={userPassword.old_password}
              onChange={(event) => {
                setUserPassword({
                  ...userPassword,
                  old_password: event.target.value,
                });
              }}
            />
            <i
              className="fa-solid fa-pen-to-square"
              style={{ color: "white" }}
            ></i>
          </div>
          <div className={styles["list-input-item"]}>
            <p>New Password</p>
            <input
              type="password"
              value={userPassword.new_password}
              onChange={(event) => {
                setUserPassword({
                  ...userPassword,
                  new_password: event.target.value,
                });
              }}
            />
            <i
              className="fa-solid fa-pen-to-square"
              style={{ color: "white" }}
            ></i>
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
