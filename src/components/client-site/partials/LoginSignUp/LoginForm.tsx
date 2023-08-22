import React from "react";
import styles from "../../ClientPage.module.css";
function LoginForm() {
  const handleLogin = () => {
    // Handle login logic here
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
        />
        <input
          type="password"
          placeholder="Password"
          id={styles["input-login-password"]}
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
          <a href="./signup-page.html" className={styles["signup-text"]}>
            Signup
          </a>
        </p>
      </section>
    </div>
  );
}

export default LoginForm;
