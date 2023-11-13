/* eslint-disable jsx-a11y/alt-text */
import { io } from "socket.io-client";
import React, { useEffect, useMemo, useState } from "react";
import logo from "../../../../assets/images/pet-shop-remove-bg.png";
import styles from "../../ClientPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { message, notification } from "antd";
import ClientSearch from "../ClientSearch/ClientSearch";
import { getDataLogin } from "../../../../api/users.api";
const socket = io(`${process.env.REACT_APP_BACK_END}`);

// -----------------------------------------------------

function ClientHeaderPC() {
  const NavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "white" : "black",
    fontWeight: "bold",
    backgroundColor: isActive ? "#33d6bb" : "",
  });
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});

  const fetchUser = async () => {
    const result = await getDataLogin();
    if (result === "Invalid Token") {
      return;
    }
    setUser(result);
  };

  useEffect(() => {
    fetchUser();

    socket.on("googleLogin", () => {
      fetchUser();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    message.open({
      type: "success",
      content: "Logout Successfully",
    });
    fetchUser();
  };

  return (
    <header className={styles["header"]}>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        id={styles["background-main-menu"]}
      >
        <Container fluid className={styles["header-main-menu"]}>
          <NavLink to="/">
            <img src={logo} className={styles["header-menu-logo"]}></img>
          </NavLink>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              id={styles["menu-navlink"]}
              // style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink
                to="/"
                className={styles["navlink-main-menu"]}
                style={NavLinkStyle}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={styles["navlink-main-menu"]}
                style={NavLinkStyle}
              >
                About
              </NavLink>
              <NavLink
                to="/products"
                className={styles["navlink-main-menu"]}
                style={NavLinkStyle}
              >
                Products
              </NavLink>
              <NavLink
                to="/services"
                className={styles["navlink-main-menu"]}
                style={NavLinkStyle}
              >
                Services
              </NavLink>
              <NavLink
                to="/blogs"
                className={styles["navlink-main-menu"]}
                style={NavLinkStyle}
              >
                Blogs
              </NavLink>
              {
                <>
                  <NavLink
                    to="/login"
                    className={styles["navlink-main-menu"]}
                    style={{
                      ...NavLinkStyle,
                      display: user ? "none" : "",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={styles["navlink-main-menu"]}
                    style={{
                      ...NavLinkStyle,
                      display: user ? "none" : "",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Signup
                  </NavLink>
                  <NavLink
                    to="/"
                    className={styles["navlink-main-menu"]}
                    style={{
                      display: user ? "" : "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </>
              }

              <NavLink
                to="/cart"
                style={{
                  visibility:
                    (user && user.role_id !== 3 && "hidden") ||
                    (!user && "hidden"),
                }}
              >
                <Button
                  variant="primary"
                  className={styles["button-icon-menu"]}
                  style={{
                    visibility:
                      (user && user.role_id !== 3 && "visible") ||
                      (user && user.role_id === 1 && "hidden"),
                  }}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </Button>
              </NavLink>

              <NavLink
                to={
                  (user && user?.role_id === 1) || (user && user?.role_id === 2)
                    ? "/admin"
                    : user && user?.role_id === 3
                    ? "/user"
                    : "/"
                }
                style={{ display: user ? "" : "none" }}
              >
                <Button
                  variant="primary"
                  className={styles["button-icon-menu"]}
                >
                  <i className="fa-solid fa-user"></i>
                </Button>
              </NavLink>
            </Nav>
            <ClientSearch />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default ClientHeaderPC;
