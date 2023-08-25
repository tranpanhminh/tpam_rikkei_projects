/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import logo from "../../../../assets/images/pet-shop-remove-bg.png";
import styles from "../../ClientPage.module.css";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function ClientHeaderPC() {
  const NavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "white" : "black",
    fontWeight: "bold",
    backgroundColor: isActive ? "#33d6bb" : "",
  });
  const navigate = useNavigate();

  const [userLoginId, setUserLoginID] = useState("");
  const fetchUserLogin = () => {
    axios
      .get("http://localhost:7373/userLogin")
      .then((response) => {
        if (response.data.length !== 0) {
          setUserLoginID(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(userLoginId);

  useEffect(() => {
    fetchUserLogin();
  }, []);

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    if (userLoginId) {
      axios
        .delete(`http://localhost:7373/userLogin/${userLoginId}`)
        .then((response) => {
          console.log(response);
          console.log("Logged out successfully");
          setUserLoginID(""); // Reset userLoginId after successful logout
          navigate("/");
        })
        .catch((error) => {
          console.log("Failed to logout:", error);
        });
    } else {
      navigateToLogin();
    }
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
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              id={styles["menu-navlink"]}
              style={{ maxHeight: "100px" }}
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
                to="/login"
                className={styles["navlink-main-menu"]}
                style={NavLinkStyle}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={styles["navlink-main-menu"]}
                style={NavLinkStyle}
              >
                Signup
              </NavLink>
              <NavLink
                className={styles["navlink-main-menu"]}
                to={""}
                onClick={handleLogout}
              >
                Logout
              </NavLink>

              <NavLink to="/cart">
                <Button
                  variant="primary"
                  className={styles["button-icon-menu"]}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </Button>
              </NavLink>
              <NavLink to="/admin">
                <Button
                  variant="primary"
                  className={styles["button-icon-menu"]}
                >
                  <i className="fa-solid fa-user"></i>
                </Button>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default ClientHeaderPC;
