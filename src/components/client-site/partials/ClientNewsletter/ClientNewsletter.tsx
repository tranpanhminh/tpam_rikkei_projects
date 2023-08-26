import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import axios from "axios";
import { notification } from "antd";

function ClientNewsletter() {
  const [email, setEmail] = useState("");
  const [accounts, setAccounts] = useState([]);

  const fetchEmail = () => {
    axios
      .get("http://localhost:7373/accounts")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  console.log("Accounts", accounts);

  const listEmailAndRole = accounts.map((account: any) => {
    return {
      id: account.id,
      email: account.email,
      role: account.role,
    };
  });
  console.log(listEmailAndRole);

  const handleNewsletter = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notification.warning({
        message: "Invalid email format",
      });
      return false;
    }

    const foundAccount = listEmailAndRole.find(
      (account) => account.email === email
    );
    console.log("ID", foundAccount?.id);
    if (!foundAccount) {
      notification.warning({
        message:
          "Email is not exist in our system. Please signup to receive newsletter",
      });
      return;
    } else if (foundAccount.role === "admin") {
      notification.warning({
        message: "This email is not allowed to receive newsletter",
      });
      return;
    } else {
      const updateNewsletter = {
        newsletter_register: true,
      };
      notification.success({
        message: "Sign up to receive newsletter successfully",
      });
      axios
        .patch(
          `http://localhost:7373/accounts/${foundAccount?.id}`,
          updateNewsletter
        )
        .then((response) => fetchEmail())
        .catch((error) => console.log(error));
      setEmail("");
    }
  };

  return (
    <>
      <section className={styles["newsletter"]}>
        <h3>Our Newsletter</h3>
        <p>
          You may unsubscribe at any moment. For that purpose, please find our
          contact info in the legal notice.
        </p>
        <div className={styles["newsletter-email"]}>
          <input
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event?.target.value);
            }}
          />
          <button
            className={styles["newsletter-btn"]}
            onClick={handleNewsletter}
          >
            Receive Newsletter
          </button>
        </div>
      </section>
    </>
  );
}

export default ClientNewsletter;
