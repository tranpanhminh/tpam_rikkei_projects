import React, { useState } from "react";
import logo from "../../../../assets/images/pet-shop.png";

import styles from "../../AdminPage.module.css";

import { NavLink } from "react-router-dom";

const AdminHeader: React.FC = () => {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    // color: isActive ? "black" : "",
    color: isActive ? "#33d6bb" : "",
  });

  return (
    <>
      <header className={styles["vertical-menu"]}>
        <div className={styles["user-panel"]}>
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
          <p className={styles["user-title"]}>Admin</p>
        </div>

        <ul className={styles["main-menu"]}>
          <div>
            <NavLink
              to="/admin/manage-users"
              className={styles["navlink-menu-admin"]}
              style={navLinkStyle}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-user"></i>
                Manage Users
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/manage-products"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-boxes-stacked"></i>
                Manage Product
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/manage-orders"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-cart-shopping"></i>
                Manage Orders
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/manage-services"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-briefcase"></i>
                Manage Services
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/manage-booking"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-calendar-days"></i>
                Manage Booking
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/manage-coupons"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-newspaper"></i>
                Manage Coupons
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
            >
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

export default AdminHeader;
