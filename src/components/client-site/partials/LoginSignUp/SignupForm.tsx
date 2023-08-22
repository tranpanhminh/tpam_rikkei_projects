import React from "react";
import styles from "../../ClientPage.module.css";

function SignupForm() {
  const handleSignUp = () => {
    // Handle signup logic here
  };

  const handlePreventForm = (event: React.FormEvent) => {
    event.preventDefault();
    // Optionally handle other form submission logic here
  };

  return (
    <div className={styles["outside-form-login"]}>
      <form className={styles["form-signup"]} onSubmit={handlePreventForm}>
        <h3 className={styles["signup-title"]}>Signup</h3>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className={styles["input-email"]}
          title="Please enter a valid email format."
        />
        <div className="email-notify"></div>
        <input
          type="text"
          placeholder="Full Name"
          className={styles["input-fullname"]}
          pattern="^[a-zA-Z\s]*$"
        />
        <div className={styles["fullname-notify"]}></div>
        <input
          type="password"
          placeholder="Password"
          className={styles["input-password"]}
        />
        <div className={styles["password-notify"]}></div>
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles["input-repassword"]}
        />
        <div className={styles["repassword-notify"]}></div>
        <button className={styles["signup-button"]} onClick={handleSignUp}>
          Signup
        </button>
        <p className={styles["login-sentence"]}>
          Already have an account?{" "}
          <a href="./login-page.html" className={styles["login-text"]}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
