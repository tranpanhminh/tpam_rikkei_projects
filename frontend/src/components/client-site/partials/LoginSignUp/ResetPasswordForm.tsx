import { useState } from "react";
import styles from "../../ClientPage.module.css";

import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { userRegister } from "../../../../api/users.api";

// ----------------------------------------------------------
function ResetPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [searchParams] = useSearchParams();

  const handleRequestResetPassword = async () => {
    const 
    // const result = await userRegister(userInfo);
    // if (result) {
    //   navigate("/login");
    // }
  };

  const handleResetPassword = async () => {};

  return (
    <div className={styles["outside-form-login"]}>
      <div className={styles["form-signup"]}>
        <h3 className={styles["signup-title"]}>Request Reset Password</h3>
        <input
          type="email"
          placeholder="Email"
          id={styles["input-email"]}
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button
          className={styles["signup-button"]}
          onClick={handleRequestResetPassword}
        >
          Request Reset Password
        </button>
        <p className={styles["login-sentence"]}>
          Already have an account?{" "}
          <NavLink to="/login" className={styles["login-text"]}>
            Login
          </NavLink>
        </p>
      </div>

      <div className={styles["form-signup"]}>
        <h3 className={styles["signup-title"]}>Reset Password</h3>
        <input
          type="email"
          placeholder="Email"
          id={styles["input-password"]}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className={styles["signup-button"]}
          onClick={handleResetPassword}
        >
          Request Reset Password
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
