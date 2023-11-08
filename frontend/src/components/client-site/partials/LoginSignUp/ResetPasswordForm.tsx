import { useState } from "react";
import styles from "../../ClientPage.module.css";

import { NavLink, useNavigate } from "react-router-dom";
import { userRegister } from "../../../../api/users.api";

// ----------------------------------------------------------
function ResetPasswordForm() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    password: "",
  });

  const handleResetPassword = async () => {
    // const result = await userRegister(userInfo);
    // if (result) {
    //   navigate("/login");
    // }
  };

  return (
    <div className={styles["outside-form-login"]}>
      <div className={styles["form-signup"]}>
        <h3 className={styles["signup-title"]}>Reset Password</h3>

        <div className={styles["password-notify"]}></div>
        <input
          type="password"
          placeholder="New Password"
          className={styles["input-password"]}
          value={userInfo.password}
          onChange={(event) =>
            setUserInfo({ ...userInfo, password: event.target.value })
          }
        />
        <div className={styles["repassword-notify"]}></div>
        <button
          className={styles["signup-button"]}
          onClick={handleResetPassword}
        >
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

export default ResetPasswordForm;
