/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import logo from "../../../../assets/images/pet-shop-remove-bg.png";
import styles from "../../ClientPage.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import { io } from "socket.io-client";

import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { message, notification } from "antd";
import ClientSearch from "../ClientSearch/ClientSearch";
import { getDataLogin, getUserGoogleProfile } from "../../../../api/users.api";

// Import API

const usersAPI = process.env.REACT_APP_API_USERS;
const BACKEND_API = process.env.REACT_APP_BASE_URL;

// -----------------------------------------------------

function ClientHeaderPC() {
  // const [searchTerm, setSearchTerm] = useState("");
  const NavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "white" : "black",
    fontWeight: "bold",
    backgroundColor: isActive ? "#33d6bb" : "",
  });
  const navigate = useNavigate();
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
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

  // const handleSearch = () => {
  //   navigate(`/search/${searchTerm}`);
  // };

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
                  display:
                    (user && user?.role_id === 1) ||
                    (user && user?.role_id === 2)
                      ? "none"
                      : user && user?.role_id === 3
                      ? ""
                      : "none",
                }}
              >
                <Button
                  variant="primary"
                  className={styles["button-icon-menu"]}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </Button>
              </NavLink>
              <NavLink
                to={
                  user?.role_id === 1 || user?.role_id === 2
                    ? "/admin"
                    : user?.role_id === 3
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
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Search
              </Button>
            </Form> */}
            <ClientSearch />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default ClientHeaderPC;
