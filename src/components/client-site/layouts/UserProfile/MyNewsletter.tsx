import React from "react";
import UserHeader from "../../partials/ClientProfile/UserHeader";
import styles from "../../partials/ClientProfile/UserProfile.module.css";
import ClientNewsletter from "../../partials/ClientProfile/ClientNewsletter/ClientNewsletter";

function MyNewsletter() {
  return (
    <div className={styles["body-user-panel"]}>
      <UserHeader />
      <main>
        <ClientNewsletter />
      </main>
    </div>
  );
}

export default MyNewsletter;
