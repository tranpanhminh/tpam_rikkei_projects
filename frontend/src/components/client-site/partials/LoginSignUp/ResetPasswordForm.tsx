import { useState } from "react";
import styles from "../../ClientPage.module.css";

import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {
  requestResetPassword,
  resetPassword,
  validateResetPasswordToken,
} from "../../../../api/users.api";
import { message, notification } from "antd";

// ----------------------------------------------------------
function ResetPasswordForm() {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const getToken = searchParams.get("resetToken");
  const [messageApi, contextHolder] = message.useMessage();

  const handleRequestResetPassword = async () => {
    const data = {
      email: email,
    };

    const result = await requestResetPassword(data);
    if (result) {
      // messageApi.open({
      //   type: "loading",
      //   content: "Loading...",
      //   duration: 0,
      // });
      setShow(true);
      // messageApi.destroy();
    }
  };

  const handleResetPassword = async () => {
    const data = {
      password: password,
    };
    const result = await validateResetPasswordToken(getToken);
    if (result) {
      messageApi.open({
        type: "loading",
        content: "Loading...",
        duration: 0,
      });
      const changeNewPassword = await resetPassword(getToken, data);
      if (changeNewPassword) {
        messageApi.destroy();
        navigate("/login");
      }
    } else {
      notification.warning({
        message: `Token is not valid or Expired`,
      });
    }
  };

  return (
    <div className={styles["outside-form-login"]}>
      {contextHolder}
      {getToken ? (
        <div className={styles["form-signup"]}>
          <h3 className={styles["signup-title"]}>Reset Password</h3>
          <input
            type="text"
            placeholder="New Password"
            id={styles["input-password"]}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className={styles["signup-button"]}
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
          <p className={styles["login-sentence"]}>
            Already have an account? &nbsp;
            <NavLink to="/login" className={styles["login-text"]}>
              Login
            </NavLink>
          </p>
        </div>
      ) : (
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
            disabled={show ? true : false}
          >
            Request Reset Password
          </button>
          <span
            style={{
              display: show ? "inline-block" : "none",
              textAlign: "justify",
            }}
          >
            An email containing the Reset Password link has been sent to your
            email. If you don't see please check spam folder.
          </span>
          <p className={styles["login-sentence"]}>
            Already have an account?{" "}
            <NavLink to="/login" className={styles["login-text"]}>
              Login
            </NavLink>
          </p>
        </div>
      )}
    </div>
  );
}

export default ResetPasswordForm;
