import React, { useEffect, useState } from "react";
import logo from "../../../../assets/images/pet-shop.png";

// Import CSS Admin Page
import styles from "./UserProfile.module.css";
import "../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";

// Import Components
import { NavLink, useNavigate } from "react-router-dom";
import { Account } from "../../../../database";
import axios from "axios";
import { Badge } from "react-bootstrap";

const UserHeader: React.FC = () => {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  console.log(getLoginData);
  const [user, setUser] = useState<any>(null);
  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#33d6bb" : "",
  });

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };
  return (
    <>
      <header className={styles["vertical-menu"]}>
        {user && (
          <div className={styles["user-panel"]}>
            <NavLink to="/" className={styles["navlink-menu-user-panel"]}>
              <img
                src={user.image_avatar ? user.image_avatar : logo}
                alt=""
                className={styles["user-panel-avatar"]}
              />
            </NavLink>
            {/* <p className={styles["user-title"]}>User Panel</p> */}
            <Badge bg="success" style={{ fontSize: "16px", marginTop: "30px" }}>
              {user.fullName.length > 15
                ? user.fullName.split(" ")[0]
                : user.fullName}
            </Badge>
          </div>
        )}

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
          <div>
            <NavLink
              to="/user/my-newsletter"
              className={styles["navlink-menu-user-panel"]}
              style={navLinkStyle}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-newspaper"></i>
                My Newsletters
              </li>
            </NavLink>
          </div>
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
