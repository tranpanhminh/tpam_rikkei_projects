import { useState } from "react";
import styles from "../../ClientPage.module.css";

import { NavLink, useNavigate } from "react-router-dom";
import { googleLogin, userRegister } from "../../../../api/users.api";

// ----------------------------------------------------------
function SignupForm() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    full_name: "",
    password: "",
    re_password: "",
  });

  const handleSignUp = async () => {
    const result = await userRegister(userInfo);
    if (result) {
      navigate("/login");
    }
  };

  const handleLoginGoogle = async () => {
    const result = await googleLogin();
    console.log(result);
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
        <img
          onClick={handleLoginGoogle}
          className={styles["login-with-gmail-icon"]}
          src="https://lh3.googleusercontent.com/pw/ADCreHegvVqjrlu6-MwIabR-C80Sia1Zolx0arEaPN8scwh2dI4zLaZpJ_t-krhto9nfJ5Fb9a_FcxacX9TFSaBMhJghcPSDNK_jH94yqX5nqfXnDYYUyaf99saH-6iYuOhat_wmiCwzGzmWng-CIU0R8GI2aY97TtmjoMkXjOI9rLax7O5ri6bODXez2QKT3CWEHHRg_OdflaOzco8vjmYq2JiLBnMd7nVDo7X_5zBkB7xSav7HCnwYD2uIQWgSW8lcMgWw1RkR9vjy2qeQdBP6mT0cAL527yar3PrHHbGJ9brblaMbZU3mjneWV5rB5SHsCW3QPNlEnRTgTFr0FGkoBMeYRc-xcjJqLXRmhoQVS7HR7XPBejMI_PmsRzYvyhqpAg9nWjo3AGVj5IG-hJGL1e9nLlt-F6aGopbhRszlvD1_n1JlTXnPMf5kpCbJtkX7XSiQUhePeIk3Q8Bk6wIPVvB9Uc9a4TWHrEmwpFvgAKAYq9ea9Qv6_us5VpsXwOw1ybdb7Tk6wA9HIQabIqYFn7WF_DCGZYWSf8-huTVHNYBWbmYSfCDS5E1CQwl6QiW44VqaCHIZYDj-rKD0OBiTgRSi1g9wR5EFcSKzS6_Pj8F9EQG_O7y0Hi-xrKVZRrHk39XjqKQjCRtU8K888ZQ6WfWOgMDjp-Wr6_o2XMRDaYBeV1ifCnyDQCNx5nokcDqFCd1NNmMg9xBdzW50YvtD50esM_Vv5he6nR6PSUw0-Fey6J7oI4KIbdlWVUMWoI8S81JNLtn_s7iQjTFVWyAN_wbS7CXtM-nroSI3598FJg2qe_QTLO0tsDnxhqofMUQ-PpRrLSUbWBzgg-t0_Uokn7dTyJJDLTRqTiQLVrQlKloVEV2eVKok0gFVb5jVw4j4_IJXYIGbenYrmBHDRjvCZoJPdQ=w1112-h282-s-no-gm?authuser=0"
          alt=""
        />
        <p className={styles["login-sentence"]}>
          Already have an account?{" "}
          <NavLink to="/login" className={styles["login-text"]}>
            Login
          </NavLink>
        </p>
        <p className={styles["login-sentence"]}>
          <NavLink to="/reset-password" className={styles["login-text"]}>
            Forgot Password
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
