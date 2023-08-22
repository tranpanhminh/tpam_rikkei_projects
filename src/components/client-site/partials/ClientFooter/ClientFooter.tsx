import React from "react";
import logo from "../../../../assets/images/pet-shop.png";

function ClientFooter() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-xl-3">
            <p className="footer-headline">CONTACT US</p>
            <div className="group-footer-logo">
              <img src={logo} alt="" className="footer-logo" />
              <p className="footer-description">
                Your one-stop destination for all your pet needs. Discover a
                wide range of adorable companions and quality pet products at
                our pet shop.
              </p>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-xl-3">
            <p className="footer-headline">HELP & INFORMATION</p>
            <ul>
              <li>
                <a href="./about.html">About Us</a>
              </li>
              <li>
                <a href="./special-page/contact-us.html">Contact Us</a>
              </li>
              <li>
                <a href="./special-page/faqs.html">FAQs</a>
              </li>
              <li>
                <a href="./special-page/secure-shopping.html">
                  Secure Shopping
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-xl-3">
            <p className="footer-headline">CUSTOMER SERVICE</p>
            <ul>
              <li>
                <a href="./special-page/return-policy.html">Return Policy</a>
              </li>
              <li>
                <a href="./special-page/refund-policy.html">Refund Policy</a>
              </li>
              <li>
                <a href="./special-page/privacy-policy.html">Privacy Policy</a>
              </li>
              <li>
                <a href="./special-page/shipping-policy.html">
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-xl-3">
            <p className="footer-headline">SITE NAVIGATION</p>
            <ul>
              <li>
                <a href="./special-page/billing-terms.html">
                  Billing Terms & Conditions
                </a>
              </li>
              <li>
                <a href="./special-page/copyright-dispute-policy.html">
                  Copyright Dispute Policy
                </a>
              </li>
              <li>
                <a href="./special-page/terms-of-service.html">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ClientFooter;
