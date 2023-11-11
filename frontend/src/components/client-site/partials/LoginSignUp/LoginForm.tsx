import React, { useState } from "react";
import styles from "../../ClientPage.module.css";
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
          src="https://lh3.googleusercontent.com/pw/ADCreHegvVqjrlu6-MwIabR-C80Sia1Zolx0arEaPN8scwh2dI4zLaZpJ_t-krhto9nfJ5Fb9a_FcxacX9TFSaBMhJghcPSDNK_jH94yqX5nqfXnDYYUyaf99saH-6iYuOhat_wmiCwzGzmWng-CIU0R8GI2aY97TtmjoMkXjOI9rLax7O5ri6bODXez2QKT3CWEHHRg_OdflaOzco8vjmYq2JiLBnMd7nVDo7X_5zBkB7xSav7HCnwYD2uIQWgSW8lcMgWw1RkR9vjy2qeQdBP6mT0cAL527yar3PrHHbGJ9brblaMbZU3mjneWV5rB5SHsCW3QPNlEnRTgTFr0FGkoBMeYRc-xcjJqLXRmhoQVS7HR7XPBejMI_PmsRzYvyhqpAg9nWjo3AGVj5IG-hJGL1e9nLlt-F6aGopbhRszlvD1_n1JlTXnPMf5kpCbJtkX7XSiQUhePeIk3Q8Bk6wIPVvB9Uc9a4TWHrEmwpFvgAKAYq9ea9Qv6_us5VpsXwOw1ybdb7Tk6wA9HIQabIqYFn7WF_DCGZYWSf8-huTVHNYBWbmYSfCDS5E1CQwl6QiW44VqaCHIZYDj-rKD0OBiTgRSi1g9wR5EFcSKzS6_Pj8F9EQG_O7y0Hi-xrKVZRrHk39XjqKQjCRtU8K888ZQ6WfWOgMDjp-Wr6_o2XMRDaYBeV1ifCnyDQCNx5nokcDqFCd1NNmMg9xBdzW50YvtD50esM_Vv5he6nR6PSUw0-Fey6J7oI4KIbdlWVUMWoI8S81JNLtn_s7iQjTFVWyAN_wbS7CXtM-nroSI3598FJg2qe_QTLO0tsDnxhqofMUQ-PpRrLSUbWBzgg-t0_Uokn7dTyJJDLTRqTiQLVrQlKloVEV2eVKok0gFVb5jVw4j4_IJXYIGbenYrmBHDRjvCZoJPdQ=w1112-h282-s-no-gm?authuser=0"
          alt=""
        />
        <p className={styles["signup-sentence"]}>
          Don't have an account?{" "}
          <NavLink to="/signup" className={styles["signup-text"]}>
            Signup
          </NavLink>
        </p>
        <p className={styles["login-sentence"]}>
          <NavLink to="/reset-password" className={styles["login-text"]}>
            Forgot Password
          </NavLink>
        </p>
      </section>
    </div>
  );
}

export default LoginForm;
