import React, { useEffect, useRef } from "react";
import styles from "../UserProfile.module.css";
import { Account } from "../../../../../database";
import { useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";

//  API
const usersAPI = process.env.REACT_APP_API_USERS;

// -------------------------------------------------

function ClientEditProfile() {
  document.title = "My Profile | PetShop";
  const navigate = useNavigate();
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [userFullName, setUserFullName] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [image, setImage] = useState<any>("");
  const [user, setUser] = useState<any>({});
  const [avatar, setAvatar] = useState("");
  const [display, setDisplay] = useState("none");
  const [userPassword, setUserPassword] = useState<any>({
    oldPassword: "",
    newPassword: "",
  });

  const fetchUser = () => {
    axios
      .get(`${usersAPI}/detail/${getLoginData.id}`)
      .then((response) => {
        setUser(response.data);
        setUserFullName(response.data.fullName);
        setAvatar(response.data.image_avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    navigate("/user/my-profile/?edit");
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setImage("");
    resetInputImage();
    setUserPassword({
      oldPassword: "",
      newPassword: "",
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
  const changeFullName = () => {
    const userInfo = {
      full_name: userFullName,
    };
    axios
      .patch(`${usersAPI}/update/${getLoginData.id}`, userInfo)
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        setShow(false);
        fetchUser();
        navigate("/user/my-profile/");
      })
      .catch((error) => {
        notification.error({
          message: `${error.response.data.message}`,
        });
      });
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
    console.log(selectedFile, "SELECT FILE");
    if (selectedFile) {
      const avatar = URL.createObjectURL(selectedFile);
      setImage(avatar);
    }
    setAvatar(event?.target.files[0]);
  };

  const updateAvatar = () => {
    const formData: any = new FormData();
    formData.append("image_avatar", avatar);
    formData.append("_method", "PATCH");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .patch(`${usersAPI}/edit-avatar/${getLoginData.id}`, formData, config)
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        setShow(false);
        resetInputImage();
        fetchUser();
        navigate("/user/my-profile/");
      })
      .catch((error) => {
        notification.error({
          message: `${error.response.data.message}`,
        });
      });
  };
  // ------------------------------------------

  // Change Password
  const changePassword = () => {
    axios
      .patch(`${usersAPI}/change-password/${getLoginData.id}`, userPassword)
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        setUserPassword({
          oldPassword: "",
          newPassword: "",
        });
        fetchUser();
        localStorage.clear();
        navigate("/");
        setIsModalOpen(false);
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };

  // ------------------------------------------
  return (
    <>
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
                value={userPassword.oldPassword}
                onChange={(event) => {
                  setUserPassword({
                    ...userPassword,
                    oldPassword: event?.target.value,
                  });
                }}
              />
            </div>
            <div className={styles["my-profile-input-item"]}>
              <p>New Password</p>
              <input
                type="password"
                value={userPassword.newPassword}
                onChange={(event) => {
                  setUserPassword({
                    ...userPassword,
                    newPassword: event?.target.value,
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
