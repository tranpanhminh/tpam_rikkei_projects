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
  const [changeFullNameBtn, setChangeFullNameBtn] = useState<boolean>(false);
  const [image, setImage] = useState<any>("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const [display, setDisplay] = useState("none");

  const [user, setUser] = useState<any>({
    id: 0,
    email: "",
    full_name: "",
    password: "",
    role: "",
    status_id: "",
    cart: [],
    order_history: [],
    newsletter_register: false,
    newsletter: [],
    booking_history: [],
    image_avatar: "",
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

  const handleOk = () => {
    // Kiểm tra Full Name

    // if (!userFullName) {
    //   notification.warning({
    //     message: "Error",
    //     description: "Please Enter Full Name",
    //   });
    //   return;
    // } else
    if (!/^[a-zA-Z\s]*$/.test(userFullName)) {
      notification.warning({
        message: "Full Name cannot contain special characters or numbers",
      });
      return false;
    } else {
      setUserFullName(userFullName);
    }

    // Kiểm tra Old Password
    if (oldPassword !== "" && oldPassword !== user.password) {
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
      newPassword === user.password
    ) {
      notification.warning({
        message: "New Password & Old password must not be the same",
      });
      return;
    } else {
      setNewPassword(user.password);
    }

    const updatedUserData = {
      fullName: userFullName !== "" ? userFullName : user.fullName,
      password: newPassword !== "" ? newPassword : user.password, // Keep the same password if not changed
      image_avatar: avatar !== "" ? avatar : user.image_avatar,
    };

    // Make PUT request to update user data
    axios
      .patch(`http://localhost:7373/accounts/${user.id}`, updatedUserData)
      .then((response) => {
        setIsModalOpen(false);
        notification.success({
          message: "Updated Profile",
        });
        setUserFullName("");
        setOldPassword("");
        setNewPassword("");
        setDisplay("none");
        fetchUser();
      })
      .catch((error) => {
        console.log("Error updating user data:", error);
      });
  };

  const handleCancel = () => {
    setUserFullName(user.fullName);
    setAvatar(user.image_avatar);
    setOldPassword("");
    setNewPassword("");
    setDisplay("none");
    setIsModalOpen(false);
  };

  const handleChangePassword = () => {
    setDisplay(display ? "flex" : "none");
  };

  // Change Full Name
  const showButton = () => {
    navigate("/user/my-profile/?edit-full-name");
    setChangeFullNameBtn(true);
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
        setChangeFullNameBtn(false);
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
    const userInfo = {
      image_avatar: avatar,
    };

    axios
      .patch(`${usersAPI}/edit-avatar/${getLoginData.id}`, userInfo)
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        setChangeFullNameBtn(false);
        fetchUser();
        navigate("/user/my-profile/");
      })
      .catch((error) => {
        notification.error({
          message: `${error.response.data.message}`,
        });
      });
  };

  console.log(userFullName, "USER FULLN A");
  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>My Profile</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>

      <div className={styles["list-input-my-profile"]}>
        <div className={styles["my-profile-input-item"]}>
          <p>User ID</p>
          <input type="text" disabled value={user.id} />
        </div>
        <div className={styles["my-profile-input-item"]}>
          <p>Full Name</p>
          <input
            defaultValue={user.full_name}
            disabled={changeFullNameBtn === false ? true : false}
            onChange={(event) => {
              setUserFullName(event?.target.value);
            }}
          />
          &nbsp;
          <i
            className={`fa-solid fa-pen-to-square  ${styles["fullname-btn"]}`}
            style={{
              display: changeFullNameBtn === false ? "inline-block" : "none",
            }}
            onClick={showButton}
          ></i>
          <i
            className={`fa-solid fa-check  ${styles["fullname-btn"]}`}
            style={{
              display: changeFullNameBtn === true ? "inline-block" : "none",
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
          <input type="text" disabled value={user?.user_status?.name} />
        </div>
      </div>
      <br />
      <Button type="primary" onClick={showModal}>
        Edit Profile
      </Button>
      <Modal
        // title="Edit Profile"
        open={isModalOpen}
        onOk={handleOk}
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
              style={{ display: image === false ? "none" : "inline-block" }}
            >
              Update
            </Button>
          </div>
          <h6 onClick={handleChangePassword}>
            Change Password (Optional)&nbsp;
            <i className="fa-solid fa-pen-to-square"></i>
          </h6>
          <div
            style={{
              display: `${display}`,
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div className={styles["my-profile-input-item"]}>
              <p>Old Password</p>
              <input
                type="password"
                value={oldPassword}
                onChange={(event) => {
                  setOldPassword(event?.target.value);
                }}
              />
            </div>
            <div className={styles["my-profile-input-item"]}>
              <p>New Password</p>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event?.target.value);
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
