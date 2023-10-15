import React, { useState, ReactNode, useEffect, useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const [avatar, setAvatar] = useState<any>("");
  const [name, setName] = useState("");
  const [user, setUser] = useState<any>({});
  const [image, setImage] = useState<any>("");
  const [showBtn, setShowBtn] = useState<boolean>(false);
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
    navigate("/admin/?edit-user");
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // -----------------------------------------------------------

  // Handle Update Password

  const handleOk = () => {
    handleFunctionOk();
    resetInputImage();
    setIsModalOpen(false);
  };

  // -----------------------------------------------------------

  // Handle Update Name

  const handleChangeName = () => {
    const userInfo = {
      full_name: name,
    };
    axios
      .patch(`${usersAPI}/update/${getUserId}`, userInfo)
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        fetchUser();
        setShowBtn(false);
        navigate("/admin/");
      })
      .catch((error) => {
        notification.error({
          message: `${error.response.data.message}`,
        });
      });
  };

  // -----------------------------------------------------------

  // Handle Change Avatar

  const fileInputRef = useRef<any>(null);
  const resetInputImage = () => {
    if (image) {
      setAvatar("");
    }
    setShowBtn(false);
    setImage(null);
    fileInputRef.current.value = null; // Đặt giá trị về null
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageURL: any = URL.createObjectURL(selectedFile);
      setImage(imageURL);
    }

    setAvatar(event.target.files[0]);
  };

  const changeAvatar = () => {
    const formData: any = new FormData();
    formData.append("image_avatar", avatar);
    formData.append("_method", "PATCH");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .patch(`${usersAPI}/edit-avatar/${getUserId}`, formData, config)
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        resetInputImage();
        fetchUser();
        navigate("/admin/");
      })
      .catch((error) => {
        notification.error({
          message: `${error.response.data.message}`,
        });
      });
  };

  // -----------------------------------------------------------

  // Set Show Button
  const checkButton = () => {
    if (showBtn === true) {
      return true;
    }
    return false;
  };

  const setButton = () => {
    if (showBtn === true) {
      return setShowBtn(false);
    } else {
      return setShowBtn(true);
    }
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
          {image ? (
            <img src={image} alt="" className={styles["user-avatar"]} />
          ) : (
            <img
              src={user.image_avatar}
              alt=""
              className={styles["user-avatar"]}
            />
          )}

          {/* <div className={styles["list-input-item"]}>
            <p>User ID</p>
            <input type="text" value={user?.id} disabled />
          </div> */}
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
              defaultValue={user?.full_name}
              onChange={(event) => setName(event.target.value)}
              disabled={checkButton() === true ? false : true}
            />
            <i
              className={`${
                showBtn === false
                  ? "fa-solid fa-pen-to-square"
                  : "fa-solid fa-check"
              }  ${styles["fa-btn"]}`}
              onClick={showBtn === false ? setButton : handleChangeName}
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
              type="text"
              onChange={(event) => {
                setOldPassword(event.target.value);
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
              type="text"
              onChange={(event) => {
                setNewPassword(event.target.value);
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
