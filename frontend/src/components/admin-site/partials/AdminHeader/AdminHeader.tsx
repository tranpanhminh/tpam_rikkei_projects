import { io } from "socket.io-client";
import React, { useEffect, useState, useCallback } from "react";
import logo from "../../../../assets/images/pet-shop.png";
import styles from "../../AdminPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { message } from "antd";
import { Badge } from "react-bootstrap";
import DetailButtonUser from "../ManageUsers/Button/DetailUser/DetailButtonUser";
import { getDataLogin } from "../../../../api/users.api";

// -----------------------------------------------------------

const AdminHeader: React.FC = () => {
  const socket = io(`${process.env.REACT_APP_BACK_END}`);
  // States
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  // -----------------------------------------------------------

  // Fetch API
  const fetchUser = async () => {
    const result = await getDataLogin();
    setUser(result);
  };

  useEffect(() => {
    fetchUser();
    socket.on("updateAdminAvatar", () => {
      fetchUser();
    });
    socket.on("updateAdminName", () => {
      fetchUser();
    });
    return () => {
      socket.off("updateAdminAvatar");
      socket.off("updateAdminName");
    };
  }, []);

  const handleUpdateUser = async () => {
    await fetchUser();
  };
  // -----------------------------------------------------------

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#33d6bb" : "",
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    message.open({
      type: "success",
      content: "Logout Successfully",
    });
  };

  return (
    <>
      <header className={styles["vertical-menu"]}>
        <div className={styles["user-panel"]}>
          <NavLink to="/">
            <img
              src={user?.image_avatar ? user?.image_avatar : logo}
              className={styles["admin-panel-avatar"]}
              alt=""
            />
          </NavLink>
          <Badge
            bg="success"
            style={{
              fontSize: "16px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            {user?.full_name?.length > 15
              ? user?.full_name.split(" ")[0]
              : user?.full_name}
          </Badge>

          <DetailButtonUser
            getUserId={user?.id}
            value="Edit Profile"
            handleFunctionOk={handleUpdateUser}
          ></DetailButtonUser>
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
                Manage Products
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
                {/* <i className="fa-solid fa-briefcase"></i> */}
                <i className="fa-solid fa-city"></i>
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
                {/* <i className="fa-solid fa-calendar-days"></i> */}
                <i className="fa-solid fa-suitcase"></i>
                Manage Booking
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/manage-vendors"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-cubes"></i>
                Manage Vendors
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
              to="/admin/manage-posts"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-list"></i>Manage Posts
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/manage-comments"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-comment"></i>Manage Comments
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/admin/report"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
            >
              <li className={styles["admin-btn"]}>
                <i className="fa-solid fa-signal"></i>Report
              </li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/"
              style={navLinkStyle}
              className={styles["navlink-menu-admin"]}
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

export default AdminHeader;
