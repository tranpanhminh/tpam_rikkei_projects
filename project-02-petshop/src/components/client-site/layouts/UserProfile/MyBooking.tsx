import React from "react";
import UserHeader from "../../partials/ClientProfile/UserHeader";
import styles from "../../partials/ClientProfile/UserProfile.module.css";
import ClientBooking from "../../partials/ClientProfile/ClientBooking/ClientBooking";
function MyBooking() {
  return (
    <div className={styles["body-user-panel"]}>
      <UserHeader />
      <main>
        <ClientBooking/>
      </main>
    </div>
  );
}

export default MyBooking;
