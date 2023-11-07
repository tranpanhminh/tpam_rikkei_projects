import React, { useState } from "react";
import styles from "../../ClientPage.module.css";
import { message, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { googleLogin, login } from "../../../../api/users.api";

// ----------------------------------------------

function LoginForm() {
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(dataLogin);
    if (result) {
      navigate("/");
    }
  };

  const handleLoginGoogle = async () => {
    await googleLogin();
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
