import React, { useState } from "react";
import styles from "../../ClientPage.module.css";
import axios from "axios";
import { userAccount } from "../../../../database";
import { notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataLogin, setDataLogin] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    if (email === "" || email === null) {
      notification.warning({
        message: "Email not be blank",
      });
      return false;
    }
    if (password === "" || password === null) {
      notification.warning({
        message: "Password not be blank",
      });
      return false;
    }

    axios
      .get(`http://localhost:7373/accounts/?email=${email}`)
      .then((response) => {
        if (response.data.length === 0) {
          notification.warning({
            message: "Email is not exist",
          });
        } else {
          const account = response.data.find(
            (acc: userAccount) => acc.email === email
          );

          if (account.password !== password) {
            notification.warning({
              message: "Password is not valid",
            });
          } else {
            notification.success({
              message: "Login Successfully",
            });
            navigate("/");
            const loginData = {
              loginId: account.id,
              role: account.role,
            };
            // Update user login status using axios.put
            // axios
            //   .post(`http://localhost:7373/userLogin/`, loginData)
            //   .then((response) => {})
            //   .catch((error) => {
            //     console.log(error);
            //     console.log("Failed to update userLogin");
            //   });
            localStorage.setItem("auth", JSON.stringify(loginData));
          }
        }
      })
      .catch((error) => {
        console.log("Failed");
      });
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          id={styles["input-login-password"]}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className={styles["forgot-password"]}>
          <a href="#" className={styles["forgot-password-text"]}>
            Forgot password?
          </a>
        </p>
        <button className={styles["login-button"]} onClick={handleLogin}>
          Login
        </button>
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
