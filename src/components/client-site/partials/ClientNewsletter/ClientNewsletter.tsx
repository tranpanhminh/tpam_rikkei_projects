import React from "react";
import styles from "../../ClientPage.module.css";

function ClientNewsletter() {
  return (
    <>
      <section className={styles["newsletter"]}>
        <h3>Our Newsletter</h3>
        <p>
          You may unsubscribe at any moment. For that purpose, please find our
          contact info in the legal notice.
        </p>
        <div className={styles["newsletter-email"]}>
          <input type="text" />
          <button className={styles["newsletter-btn"]}>
            Receive Newsletter
          </button>
        </div>
      </section>
    </>
  );
}

export default ClientNewsletter;
