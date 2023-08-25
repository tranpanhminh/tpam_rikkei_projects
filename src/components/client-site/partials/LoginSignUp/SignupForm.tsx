import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import { notification } from "antd";
import axios from "axios";

import { Account } from "../../../../database";

function SignupForm() {
  const [listAccounts, setListAccounts] = useState<Account[]>([]);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const fetchUsers = () => {
    axios
      .get("http://localhost:7373/accounts")
      .then((response) => {
        setListAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  let filterEmail = listAccounts.map((account) => {
    return account.email;
  });

  const handleSignUp = () => {
    if (email === "" || email === null) {
      notification.warning({
        message: "Email not be blank",
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notification.warning({
        message: "Invalid email format",
      });
      return false;
    }
    if (fullName === "" || fullName === null) {
      notification.warning({
        message: "Full Name not be blank",
      });
      return false;
    }
    if (!/^[a-zA-Z\s]*$/.test(fullName)) {
      notification.warning({
        message: "Full Name cannot contain special characters or numbers",
      });
      return false;
    }
    if (password === "" || password === null) {
      notification.warning({
        message: "Password not be blank",
      });
      return false;
    }
    if (password.length < 8) {
      notification.warning({
        message: "Password must be at least 8 characters",
      });
      return false;
    }
    if (repassword === "" || repassword === null) {
      notification.warning({
        message: "Confirm Password not be blank",
      });
      return false;
    }

    if (password !== repassword) {
      notification.warning({
        message: "Password must match with Confirm Password",
      });
      return false;
    }

    if (filterEmail.includes(email)) {
      notification.warning({
        message: "Email is already taken",
      });
    } else {
      let listId: any = listAccounts.map((account) => {
        return account.id;
      });

      let maxId = Math.max(...listId);
      const newUser = {
        id: maxId + 1,
        email: email,
        fullName: fullName,
        password: password,
        role: "customer",
        status: "Active",
        cart: [],
        order_history: [],
        newsletter_register: false,
        newsletter: [],
        booking: [],
        booking_history: [],
      };

      axios
        .post("http://localhost:7373/accounts", newUser)
        .then((response) => {
          setListAccounts(response.data);
          console.log(listAccounts);
        })
        .catch((error) => {
          console.log(error);
        });

      notification.success({
        message: "Signup Successfully",
      });

      setEmail("");
      setFullName("");
      setPassword("");
      setRePassword("");
      fetchUsers();
    }
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="email-notify"></div>
        <input
          type="text"
          placeholder="Full Name"
          className={styles["input-fullname"]}
          pattern="^[a-zA-Z\s]*$"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
        <div className={styles["fullname-notify"]}></div>
        <input
          type="password"
          placeholder="Password"
          className={styles["input-password"]}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className={styles["password-notify"]}></div>
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles["input-repassword"]}
          value={repassword}
          onChange={(event) => setRePassword(event.target.value)}
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
