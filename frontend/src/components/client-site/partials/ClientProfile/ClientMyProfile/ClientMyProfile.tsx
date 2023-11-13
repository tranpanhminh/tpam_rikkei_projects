import { io } from "socket.io-client";
import React, { useEffect, useRef } from "react";
import styles from "../UserProfile.module.css";
import { useState } from "react";
import { Button, Modal, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import {
  changeUserAvatar,
  changeUserName,
  changeUserPassword,
  getDataLogin,
} from "../../../../../api/users.api";
const socket = io(`${process.env.REACT_APP_BACK_END}`);

// -------------------------------------------------

function ClientEditProfile() {
  document.title = "My Profile | PetShop";
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [userFullName, setUserFullName] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [image, setImage] = useState<any>("");
  const [user, setUser] = useState<any>({});
  const [avatar, setAvatar] = useState("");
  const [display, setDisplay] = useState("none");
  const [userPassword, setUserPassword] = useState<any>({
    old_password: "",
    new_password: "",
  });
  // -------------------------------------------------

  const fetchUser = async () => {
    const result = await getDataLogin();
    return setUser(result);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const showModal = () => {
    navigate("/user/my-profile/?edit");
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setImage("");
    resetInputImage();
    setUserPassword({
      old_password: "",
      new_password: "",
    });
    setIsModalOpen(false);
  };

  const handleChangePassword = () => {
    setDisplay(display ? "flex" : "none");
  };

  // Change Full Name
  const showButton = () => {
    navigate("/user/my-profile/?edit-full-name");
    setShow(true);
  };

  const changeFullName = async () => {
    const userInfo = {
      full_name: userFullName,
    };
    const result = await changeUserName(user.id, userInfo);
    setShow(false);
    fetchUser();
    navigate("/user/my-profile/");
    socket.emit("updateName");
    return result;
  };
  // ------------------------------------------

  // Change Avatar
  const fileInputRef = useRef<any>(null);

  const resetInputImage = () => {
    if (image) {
      setAvatar("");
      setImage(null);
      fileInputRef.current.value = null; // Đặt giá trị về null
    }
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event?.target.files[0];
    if (!event.target.files[0].type.includes("image")) {
      fileInputRef.current.value = null; // Đặt giá trị về null
      return notification.warning({
        message: "Only file type Image is accepted",
      });
    }
    if (selectedFile && event.target.files[0].type.includes("image")) {
      const avatar = URL.createObjectURL(selectedFile);
      setImage(avatar);
    }
    setAvatar(event?.target.files[0]);
  };

  const updateAvatar = async () => {
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
        content: "Loading...",
        duration: 0,
      });
      const result = await changeUserAvatar(user.id, formData, config);
      messageApi.destroy();
      setShow(false);
      resetInputImage();
      fetchUser();
      socket.emit("updateAvatar");
      navigate("/user/my-profile/");
      return result;
    } else {
      notification.error({
        message: `Please upload image`,
      });
    }
  };
  // ------------------------------------------

  // Change Password
  const changePassword = async () => {
    const result = await changeUserPassword(user.id, userPassword);
    if (result) {
      setUserPassword({
        old_password: "",
        new_password: "",
      });
      fetchUser();
      localStorage.clear();
      navigate("/");
      setIsModalOpen(false);
      return result;
    }
  };

  // ------------------------------------------
  return (
    <>
      {contextHolder}
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>My Profile</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>

      <div className={styles["list-input-my-profile"]}>
        <div className={styles["my-profile-input-item"]}>
          <p>User ID</p>
          <input type="text" disabled value={user?.id} />
        </div>
        <div className={styles["my-profile-input-item"]}>
          <p>Full Name</p>
          <input
            defaultValue={user?.full_name}
            disabled={show === false ? true : false}
            onChange={(event) => {
              setUserFullName(event?.target.value);
            }}
          />
          &nbsp;
          <i
            className={`fa-solid fa-pen-to-square  ${styles["fullname-btn"]}`}
            style={{
              display: show === false ? "inline-block" : "none",
            }}
            onClick={showButton}
          ></i>
          <i
            className={`fa-solid fa-check  ${styles["fullname-btn"]}`}
            style={{
              display: show === true ? "inline-block" : "none",
            }}
            onClick={changeFullName}
          ></i>
        </div>
        <div className={styles["my-profile-input-item"]}>
          <p>Email</p>
          <input type="text" disabled value={user.email} />
        </div>
        <div className={styles["my-profile-input-item"]}>
          <p>Status</p>
          <input type="text" disabled value={user?.user_statuses?.name} />
        </div>
      </div>
      <br />
      <Button type="primary" onClick={showModal}>
        Edit Profile
      </Button>
      <Modal
        // title="Edit Profile"
        open={isModalOpen}
        onOk={changePassword}
        onCancel={handleCancel}
      >
        <div className={styles["list-input-my-profile"]}>
          <h6>Edit Profile (Optional)</h6>
          {image ? (
            <img src={image} alt="" className={styles["user-avatar-preview"]} />
          ) : (
            <img
              src={user?.image_avatar}
              alt=""
              className={styles["user-avatar-preview"]}
            />
          )}

          <div className={styles["my-profile-input-item"]}>
            <p>Avatar</p>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef}
            />
            <Button
              type="primary"
              style={{ display: !image ? "none" : "inline-block" }}
              onClick={updateAvatar}
            >
              Update
            </Button>
          </div>
          <h6 onClick={handleChangePassword}>
            Change Password (Optional)&nbsp;
            {/* <i className="fa-solid fa-pen-to-square"></i> */}
          </h6>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div className={styles["my-profile-input-item"]}>
              <p>Old Password</p>
              <input
                type="password"
                value={userPassword.old_password}
                onChange={(event) => {
                  setUserPassword({
                    ...userPassword,
                    old_password: event?.target.value,
                  });
                }}
              />
            </div>
            <div className={styles["my-profile-input-item"]}>
              <p>New Password</p>
              <input
                type="password"
                value={userPassword.new_password}
                onChange={(event) => {
                  setUserPassword({
                    ...userPassword,
                    new_password: event?.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ClientEditProfile;
