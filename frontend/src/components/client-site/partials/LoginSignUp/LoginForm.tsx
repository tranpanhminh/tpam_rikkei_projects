import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import axios from "axios";
import { userAccount } from "../../../../database";
import { message, notification } from "antd";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import BaseAxios from "./../../../../api/apiAxiosClient";
import {
  getDataLogin,
  googleCallback,
  googleLogin,
} from "../../../../api/users.api";

// Import API
const baseURL = process.env.REACT_APP_BASE_URL;
const usersAPI = process.env.REACT_APP_API_USERS;
// ----------------------------------------------

function LoginForm() {
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    await axios
      .post(`${usersAPI}/login`, dataLogin)
      .then((response) => {
        console.log(response);
        const dataResponse = response.data;
        const dataUser = {
          id: dataResponse.data.id,
        };
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("auth", JSON.stringify(dataUser));
        message.open({
          type: "success",
          content: "Login Successfully",
        });
        navigate("/");
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };

  const handleLoginGoogle = async () => {
    const result = await googleLogin();
    console.log(result);
  };

  return (
    <div className={styles["outside-form-login"]}>
      <section className={styles["form-login"]}>
        <h3 className={styles["login-title"]}>Login</h3>
        <input
          type="email"
          placeholder="Email"
          id={styles["input-login-email"]}
          required
          value={dataLogin.email}
          onChange={(event) =>
            setDataLogin({ ...dataLogin, email: event.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          id={styles["input-login-password"]}
          required
          value={dataLogin.password}
          onChange={(event) =>
            setDataLogin({ ...dataLogin, password: event.target.value })
          }
        />
        {/* <p className={styles["forgot-password"]}>
          <a href="#" className={styles["forgot-password-text"]}>
            Forgot password?
          </a>
        </p> */}
        <button className={styles["login-button"]} onClick={handleLogin}>
          Login
        </button>
        <img
          onClick={handleLoginGoogle}
          className={styles["login-with-gmail-icon"]}
          src="https://i.ibb.co/Fn5TJW6/google-signin-button.png"
          alt=""
        />
        <p className={styles["signup-sentence"]}>
          Don't have an account?{" "}
          <NavLink to="/signup" className={styles["signup-text"]}>
            Signup
          </NavLink>
        </p>
      </section>
    </div>
  );
}

export default LoginForm;
