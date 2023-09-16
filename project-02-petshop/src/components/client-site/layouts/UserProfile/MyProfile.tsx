import React from "react";
import UserHeader from "../../partials/ClientProfile/UserHeader";
import ClientEditProfile from "../../partials/ClientProfile/ClientMyProfile/ClientMyProfile";
import styles from "../../partials/ClientProfile/UserProfile.module.css";
function MyProfile() {
  return (
    <div className={styles["body-user-panel"]}>
      <UserHeader />
      <main>
        <ClientEditProfile />
      </main>
    </div>
  );
}

export default MyProfile;
