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
          src="https://rabbunny.com/wp-content/uploads/2023/11/google-signin-button.png"
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
