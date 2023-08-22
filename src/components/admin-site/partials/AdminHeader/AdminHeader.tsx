import React, { useState } from "react";
import logo from "../../../../assets/images/pet-shop.png";

import ManageUsers from "../ManageUsers/ManageUsers";
import ManageOrders from "../ManageOrders/ManageOrders";
import ManageProducts from "../ManageProducts/ManageProducts";
import ManageBooking from "../ManageBooking/ManageBooking";
import ManageServices from "../ManageServices/ManageServices";
import ManageCoupon from "../ManageCoupon/ManageCoupon";

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
    <>
      <header className="vertical-menu">
        <div className="user-panel">
          <a href="/index.html">
            <img src={logo} alt="" />
          </a>
          <p className="user-title">Admin</p>
        </div>

        <ul className="main-menu">
          <div
            className={type === "ManageUsers" ? "active" : ""}
            onClick={() => setType("ManageUsers")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-user"></i>
              Manage Users
            </li>
          </div>
          <div
            className={type === "ManageProducts" ? "active" : ""}
            onClick={() => setType("ManageProducts")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-boxes-stacked"></i>
              Manage Product
            </li>
          </div>
          <div
            className={type === "ManageOrders" ? "active" : ""}
            onClick={() => setType("ManageOrders")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-cart-shopping"></i>
              Manage Orders
            </li>
          </div>
          <div
            className={type === "ManageServices" ? "active" : ""}
            onClick={() => setType("ManageServices")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-briefcase"></i>
              Manage Services
            </li>
          </div>
          <div
            className={type === "ManageBooking" ? "active" : ""}
            onClick={() => setType("ManageBooking")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-calendar-days"></i>
              Manage Booking
            </li>
          </div>
          <div
            className={type === "ManageCoupon" ? "active" : ""}
            onClick={() => setType("ManageCoupon")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-newspaper"></i>
              Manage Coupons
            </li>
          </div>
          <div>
            <li className="admin-btn">
              <i className="fa-solid fa-right-from-bracket"></i>Logout
            </li>
          </div>
        </ul>
      </header>

      <main>{renderContent()}</main>
    </>
  );
};

export default AdminHeader;
