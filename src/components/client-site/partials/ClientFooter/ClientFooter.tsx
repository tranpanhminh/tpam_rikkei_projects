import React, { useState } from "react";
import logo from "../../../../assets/images/pet-shop.png";
import styles from "../../ClientPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
function ClientFooter() {
  // const [pageName, setPageName] = useState("");
  // const navigate = useNavigate();
  // const navigateTo = (pageTitle: string) => {
  //   // setPageName(pageTitle);
  //   navigate(`/special-page/${pageTitle}`);
  //   console.log("PageTItle", pageTitle);
  // };

  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-xl-3">
              <p className={styles["footer-headline"]}>CONTACT US</p>
              <div className={styles["group-footer-logo"]}>
                <img src={logo} alt="" className={styles["footer-logo"]} />
                <p className={styles["footer-description"]}>
                  Your one-stop destination for all your pet needs. Discover a
                  wide range of adorable companions and quality pet products at
                  our pet shop.
                </p>
              </div>
            </div>
            <div
              className="col-12 col-sm-12 col-md-12 col-xl-3"
              id={styles["col-12"]}
            >
              <p className={styles["footer-headline"]}>HELP & INFORMATION</p>
              <ul>
                <li>
                  <NavLink to="./about">About Us</NavLink>
                </li>
                <li>
                  <NavLink
                    to="/special-page/contact-us"
                    // onClick={() => {
                    //   navigateTo("contact-us");
                    // }}
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/special-page/faqs">FAQs</NavLink>
                </li>
                <li>
                  <NavLink to="/special-page/secure-shopping">
                    Secure Shopping
                  </NavLink>
                </li>
              </ul>
            </div>
            <div
              className="col-12 col-sm-12 col-md-12 col-xl-3"
              id={styles["col-12"]}
            >
              <p className={styles["footer-headline"]}>CUSTOMER SERVICE</p>
              <ul>
                <li>
                  <NavLink to="/special-page/return-policy">
                    Return Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/special-page/refund-policy">
                    Refund Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/special-page/privacy-policy">
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/special-page/shipping-policy">
                    Shipping Policy
                  </NavLink>
                </li>
              </ul>
            </div>
            <div
              className="col-12 col-sm-12 col-md-12 col-xl-3"
              id={styles["col-12"]}
            >
              <p className={styles["footer-headline"]}>SITE NAVIGATION</p>
              <ul>
                <li>
                  <NavLink to="/special-page/billing-terms">
                    Billing Terms & Conditions
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/special-page/copyright-dispute-policy">
                    Copyright Dispute Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/special-page/terms-of-service">
                    Terms of Service
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ClientFooter;
