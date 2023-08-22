import React, { useState } from "react";
import logo from "../../../../assets/images/pet-shop.png";

import ManageUsers from "../ManageUsers/ManageUsers";
import ManageOrders from "../ManageOrders/ManageOrders";
import ManageProducts from "../ManageProducts/ManageProducts";
import ManageBooking from "../ManageBooking/ManageBooking";
import ManageServices from "../ManageServices/ManageServices";
import ManageCoupon from "../ManageCoupon/ManageCoupon";

import styles from "../../AdminPage.module.css";

import {
  initializeDatabase,
  getDataFromLocal,
  setDataToLocal,
} from "../../../../database"; // Import your data fetching and setting functions

const AdminHeader: React.FC = () => {
  const [type, setType] = useState("ManageUsers");

  const renderContent = () => {
    if (type === "ManageUsers") {
      return <ManageUsers />;
    } else if (type === "ManageOrders") {
      return <ManageOrders />;
    } else if (type === "ManageProducts") {
      return <ManageProducts />;
    } else if (type === "ManageServices") {
      return <ManageServices />;
    } else if (type === "ManageBooking") {
      return <ManageBooking />;
    } else if (type === "ManageCoupon") {
      return <ManageCoupon />;
    }
    return null;
  };

  return (
    <body className={styles["main-body"]}>
      <header className={styles["vertical-menu"]}>
        <div className={styles["user-panel"]}>
          <a href="/index.html">
            <img src={logo} alt="" />
          </a>
          <p className={styles["user-title"]}>Admin</p>
        </div>

        <ul className={styles["main-menu"]}>
          <div
            className={type === styles["ManageUsers"] ? styles["active"] : ""}
            onClick={() => setType("ManageUsers")}
          >
            <li className={styles["admin-btn"]}>
              <i className="fa-solid fa-user"></i>
              Manage Users
            </li>
          </div>
          <div
            className={
              type === styles["ManageProducts"] ? styles["active"] : ""
            }
            onClick={() => setType("ManageProducts")}
          >
            <li className={styles["admin-btn"]}>
              <i className="fa-solid fa-boxes-stacked"></i>
              Manage Product
            </li>
          </div>
          <div
            className={type === styles["ManageOrders"] ? styles["active"] : ""}
            onClick={() => setType("ManageOrders")}
          >
            <li className={styles["admin-btn"]}>
              <i className="fa-solid fa-cart-shopping"></i>
              Manage Orders
            </li>
          </div>
          <div
            className={
              type === styles["ManageServices"] ? styles["active"] : ""
            }
            onClick={() => setType("ManageServices")}
          >
            <li className={styles["admin-btn"]}>
              <i className="fa-solid fa-briefcase"></i>
              Manage Services
            </li>
          </div>
          <div
            className={type === styles["ManageBooking"] ? styles["active"] : ""}
            onClick={() => setType("ManageBooking")}
          >
            <li className={styles["admin-btn"]}>
              <i className="fa-solid fa-calendar-days"></i>
              Manage Booking
            </li>
          </div>
          <div
            className={type === styles["ManageCoupon"] ? styles["active"] : ""}
            onClick={() => setType("ManageCoupon")}
          >
            <li className={styles["admin-btn"]}>
              <i className="fa-solid fa-newspaper"></i>
              Manage Coupons
            </li>
          </div>
          <div>
            <li className={styles["admin-btn"]}>
              <i className="fa-solid fa-right-from-bracket"></i>Logout
            </li>
          </div>
        </ul>
      </header>

      <main>{renderContent()}</main>
    </body>
  );
};

export default AdminHeader;
