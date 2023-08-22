import React, { useEffect } from "react";
import logo from "../../../../assets/images/pet-shop-remove-bg.png";
import styles from "../../ClientPage.module.css";

function ClientHeaderPC() {
  // useEffect(() => {
  //   const openMenu = document.querySelector(".open") as HTMLElement;
  //   const overlay = document.querySelector(
  //     ".wrapper-mobile-menu"
  //   ) as HTMLElement;
  //   const menuMobile = document.querySelector(".menu-mobile") as HTMLElement;
  //   const hideMenuMobile = document.querySelector(
  //     ".icon-close-menu"
  //   ) as HTMLElement;

  //   const openMenuClickHandler = () => {
  //     overlay.classList.add("active");
  //     menuMobile.classList.add("active");
  //   };

  //   const overlayClickHandler = (e: Event) => {
  //     if (e.target === overlay) {
  //       overlay.classList.remove("active");
  //       menuMobile.classList.remove("active");
  //     }
  //   };

  //   const hideMenuMobileClickHandler = () => {
  //     overlay.classList.remove("active");
  //     menuMobile.classList.remove("active");
  //   };

  //   openMenu.addEventListener("click", openMenuClickHandler);
  //   overlay.addEventListener("click", overlayClickHandler);
  //   hideMenuMobile.addEventListener("click", hideMenuMobileClickHandler);

  //   return () => {
  //     openMenu.removeEventListener("click", openMenuClickHandler);
  //     overlay.removeEventListener("click", overlayClickHandler);
  //     hideMenuMobile.removeEventListener("click", hideMenuMobileClickHandler);
  //   };
  // }, []);

  // const handleSearch = () => {
  //   console.log("Searched");
  // };

  // const handleLogout = () => {
  //   console.log("Log out");
  // };

  return (
    <header className={styles["header"]}>
      <nav className={styles["main-menu"]}>
        <div className={styles["logo"]}>
          <a href="/index.html">
            <img
              src={logo}
              alt="Logo Petshop"
              className={styles["logo-petshop"]}
            />
          </a>
        </div>
        <div className={styles["menu"]}>
          <ul className={styles["nav-main-menu"]}>
            <li>
              <a href="/index.html" className={styles["menu-item"]}>
                Home
              </a>
            </li>
            <li>
              <a href="/about.html" className={styles["menu-item"]}>
                About
              </a>
            </li>
            <li>
              <a href="/services-category.html" className={styles["menu-item"]}>
                Services
              </a>
            </li>
            <li>
              <a href="/products-category.html" className={styles["menu-item"]}>
                Products
              </a>
            </li>
          </ul>
        </div>
        <div className={styles["search-bar"]}>
          <input type="text" placeholder="Search" id="search-bar" />
          <i
            className="fa-solid fa-magnifying-glass"
            id={styles["search-icon"]}
            // onClick={handleSearch}
          ></i>
        </div>
        <div className={styles["group-user"]}>
          <a href="/login-page.html">
            <button className={styles["login-btn my-button"]}>Login</button>
          </a>
          <a href="/signup-page.html">
            <button className={styles["signup-btn my-button"]}>Signup</button>
          </a>
          <button
            className={styles["logout-btn my-button"]}
            // onClick={handleLogout}
          >
            <a href="/">Logout</a>
          </button>
          <a href="/my-cart.html">
            <i
              className="fa-solid fa-cart-shopping"
              id={styles["shopping-cart-icon"]}
            ></i>
          </a>
          <a href="/admin/manage-users.html" id={styles["admin-icon"]}>
            <i className="fa-solid fa-user"></i>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default ClientHeaderPC;
