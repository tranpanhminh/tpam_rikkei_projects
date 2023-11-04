import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import { notification } from "antd";
import axios from "axios";

import { Account } from "../../../../database";
import { NavLink, useNavigate } from "react-router-dom";

// Import API
const usersAPI = process.env.REACT_APP_API_USERS;

// ----------------------------------------------------------
function SignupForm() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    full_name: "",
    password: "",
    re_password: "",
  });

  const handleSignUp = () => {
    axios
      .post(`${usersAPI}/register`, userInfo)
      .then((response) => {
        notification.success({ message: response.data.message });
        navigate("/login");
      })
      .catch((error) => {
        notification.warning({ message: error.response.data.message });
      });
  };

  return (
    <div className={styles["outside-form-login"]}>
      <div className={styles["form-signup"]}>
        <h3 className={styles["signup-title"]}>Signup</h3>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className={styles["input-email"]}
          title="Please enter a valid email format."
          value={userInfo.email}
          onChange={(event) =>
            setUserInfo({ ...userInfo, email: event.target.value })
          }
        />
        <div className="email-notify"></div>
        <input
          type="text"
          placeholder="Full Name"
          className={styles["input-fullname"]}
          pattern="^[a-zA-Z\s]*$"
          value={userInfo.full_name}
          onChange={(event) =>
            setUserInfo({ ...userInfo, full_name: event.target.value })
          }
        />
        <div className={styles["fullname-notify"]}></div>
        <input
          type="password"
          placeholder="Password"
          className={styles["input-password"]}
          value={userInfo.password}
          onChange={(event) =>
            setUserInfo({ ...userInfo, password: event.target.value })
          }
        />
        <div className={styles["password-notify"]}></div>
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles["input-repassword"]}
          value={userInfo.re_password}
          onChange={(event) =>
            setUserInfo({ ...userInfo, re_password: event.target.value })
          }
        />
        <div className={styles["repassword-notify"]}></div>
        <button className={styles["signup-button"]} onClick={handleSignUp}>
          Signup
        </button>
        <p className={styles["login-sentence"]}>
          Already have an account?{" "}
          <NavLink to="/login" className={styles["login-text"]}>
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
