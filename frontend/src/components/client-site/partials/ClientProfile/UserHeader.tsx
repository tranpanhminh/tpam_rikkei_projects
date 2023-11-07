import React, { useEffect, useMemo, useState } from "react";
import logo from "../../../../assets/images/pet-shop.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Account } from "../../../../database";
import axios from "axios";
import { Badge } from "react-bootstrap";
import { message } from "antd";

// Import CSS Admin Page
import styles from "./UserProfile.module.css";
import "../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import { getDataLogin } from "../../../../api/users.api";

//  API
const usersAPI = process.env.REACT_APP_API_USERS;

// -------------------------------------------------

const UserHeader: React.FC = () => {
  const navigate = useNavigate();
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [user, setUser] = useState<any>(null);
  const fetchUser = async () => {
    const data = await getDataLogin();
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#33d6bb" : "",
  });

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    message.open({
      type: "success",
      content: "Logout Successfully",
    });
  };
  // ---------------------------------

  return (
    <>
      <header className={styles["vertical-menu"]}>
        <div className={styles["user-panel"]}>
          <NavLink to="/" className={styles["navlink-menu-user-panel"]}>
            <img
              src={user?.image_avatar ? user?.image_avatar : logo}
              alt=""
              className={styles["user-panel-avatar"]}
            />
          </NavLink>
          {/* <p className={styles["user-title"]}>User Panel</p> */}
          <Badge bg="success" style={{ fontSize: "16px", marginTop: "30px" }}>
            {user?.full_name?.length > 15
              ? user?.full_name.split(" ")[0]
              : user?.full_name}
          </Badge>
        </div>

        <ul className={styles["main-menu"]}>
          <div>
            <NavLink
              to="/user/my-profile"
              className={styles["navlink-menu-user-panel"]}
              style={navLinkStyle}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-user"></i>
                My Profile
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/user/my-orders"
              className={styles["navlink-menu-user-panel"]}
              style={navLinkStyle}
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
              style={navLinkStyle}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-calendar-days"></i>
                My Booking
              </li>
            </NavLink>
          </div>
          {/* <div>
            <NavLink
              to="/user/my-coupons"
              className={styles["navlink-menu-user-panel"]}
              style={navLinkStyle}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-newspaper"></i>
                My Coupons
              </li>
            </NavLink>
          </div> */}
          <div>
            <NavLink
              to="/"
              className={styles["navlink-menu-user-panel"]}
              onClick={handleLogout}
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

export default UserHeader;
