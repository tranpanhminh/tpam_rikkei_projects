import React, { useState } from "react";
import logo from "../../../../assets/images/pet-shop.png";

// Import CSS Admin Page
import "../../../client-site/partials/ClientProfile/ClientProfile.css";
import "../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";

// Import Components
import ClientEditProfile from "./ClientEditProfile/ClientEditProfile";
import ClientOrder from "./ClientOrder/ClientOrder";
import ClientBooking from "./ClientBooking/ClientBooking";
import ClientNewsletter from "./ClientNewsletter/ClientNewsletter";
import ClientMessage from "./ClientMessage/ClientMessage";

const ClientProfileHeader: React.FC = () => {
  const [type, setType] = useState("ClientEditProfile");

  const renderContent = () => {
    if (type === "ClientEditProfile") {
      return <ClientEditProfile />;
    } else if (type === "ClientOrder") {
      return <ClientOrder />;
    } else if (type === "ClientBooking") {
      return <ClientBooking />;
    } else if (type === "ClientNewsletter") {
      return <ClientNewsletter />;
    } else if (type === "ClientMessage") {
      return <ClientMessage />;
    }
    return null;
  };

  return (
    <div className="body">
      <header className="vertical-menu">
        <div className="user-panel">
          <a href="/index.html">
            <img src={logo} alt="" />
          </a>
          <p className="user-title">Admin</p>
        </div>

        <ul className="main-menu">
          <div
            className={type === "ClientEditProfile" ? "active" : ""}
            onClick={() => setType("ClientEditProfile")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-user"></i>
              Edit Profile
            </li>
          </div>
          <div
            className={type === "ClientOrder" ? "active" : ""}
            onClick={() => setType("ClientOrder")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-boxes-stacked"></i>
              My Order
            </li>
          </div>
          <div
            className={type === "ClientBooking" ? "active" : ""}
            onClick={() => setType("ClientBooking")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-calendar-days"></i>
              My Booking
            </li>
          </div>
          <div
            className={type === "ClientNewsletter" ? "active" : ""}
            onClick={() => setType("ClientNewsletter")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-newspaper"></i>
              My Newsletter
            </li>
          </div>
          <div
            className={type === "ClientMessage" ? "active" : ""}
            onClick={() => setType("ClientMessage")}
          >
            <li className="admin-btn">
              <i className="fa-solid fa-envelope"></i>
              My Message
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
    </div>
  );
};

export default ClientProfileHeader;
