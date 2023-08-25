import React, { useState } from "react";
import logo from "../../../../assets/images/pet-shop.png";

// Import CSS Admin Page
import styles from "./UserProfile.module.css";
import "../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";

// Import Components
import { NavLink } from "react-router-dom";

const ClientProfileHeader: React.FC = () => {
  return (
    <>
      <header className={styles["vertical-menu"]}>
        <div className={styles["user-panel"]}>
          <NavLink to="/" className={styles["navlink-menu-user-panel"]}>
            <a href="/index.html">
              <img src={logo} alt="" />
            </a>
          </NavLink>
          <p className={styles["user-title"]}>Admin</p>
        </div>

        <ul className={styles["main-menu"]}>
          <div>
            <NavLink
              to="/user/my-profile"
              className={styles["navlink-menu-user-panel"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-user"></i>
                Edit Profile
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/user/my-orders"
              className={styles["navlink-menu-user-panel"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-boxes-stacked"></i>
                My Orders
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/user/my-booking"
              className={styles["navlink-menu-user-panel"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-calendar-days"></i>
                My Booking
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/user/my-newsletter"
              className={styles["navlink-menu-user-panel"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-newspaper"></i>
                My Newsletters
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink to="/" className={styles["navlink-menu-user-panel"]}>
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-right-from-bracket"></i>Logout
              </li>
            </NavLink>
          </div>
        </ul>
      </header>
    </>
  );
};

export default ClientProfileHeader;
