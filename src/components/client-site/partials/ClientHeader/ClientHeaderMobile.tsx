import React, { useEffect } from "react";
import logo from "../../../../assets/images/pet-shop-remove-bg.png";

// Import CSS
import "../../ClientPage.css";

function ClientHeaderMobile() {
  useEffect(() => {
    const openMenu = document.querySelector(".open") as HTMLElement;
    const overlay = document.querySelector(
      ".wrapper-mobile-menu"
    ) as HTMLElement;
    const menuMobile = document.querySelector(".menu-mobile") as HTMLElement;
    const hideMenuMobile = document.querySelector(
      ".icon-close-menu"
    ) as HTMLElement;

    const openMenuClickHandler = () => {
      overlay.classList.add("active");
      menuMobile.classList.add("active");
    };

    const overlayClickHandler = (e: Event) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
        menuMobile.classList.remove("active");
      }
    };

    const hideMenuMobileClickHandler = () => {
      overlay.classList.remove("active");
      menuMobile.classList.remove("active");
    };

    openMenu.addEventListener("click", openMenuClickHandler);
    overlay.addEventListener("click", overlayClickHandler);
    hideMenuMobile.addEventListener("click", hideMenuMobileClickHandler);

    return () => {
      openMenu.removeEventListener("click", openMenuClickHandler);
      overlay.removeEventListener("click", overlayClickHandler);
      hideMenuMobile.removeEventListener("click", hideMenuMobileClickHandler);
    };
  }, []);

  const handleSearchMobile = () => {
    console.log("Search Mobile");
  };

  const handleLogout = () => {
    console.log("Logout Mobile");
  };

  return (
    <header>
      <nav className="main-menu-mobile">
        <div className="logo">
          <a href="./index.html">
            <img src={logo} alt="Logo Petshop" className="logo-petshop" />
          </a>
        </div>

        <div className="group-user">
          <i className="fa-solid fa-cart-shopping shopping-cart-icon"></i>
          <i className="fa-solid fa-bars icon-bar-menu open"></i>
        </div>

        <div className="menu-mobile">
          <i className="fa-solid fa-xmark icon-close-menu close"></i>

          <div className="group-search">
            <input
              type="text"
              placeholder="Search"
              id="search-bar"
              className="search-bar-mobile"
            />
            <i
              className="fa-solid fa-magnifying-glass"
              id="search-icon"
              onClick={handleSearchMobile}
            ></i>
          </div>

          <div className="group-btn-user">
            <a href="./login-page.html">
              <button className="login-btn my-button login-btn-mobile">
                Login
              </button>
            </a>
            <a href="./signup-page.html">
              <button className="signup-btn my-button signup-btn-mobile">
                Signup
              </button>
            </a>
            <button
              className="logout-btn my-button logout-btn-mobile"
              onClick={handleLogout}
            >
              <a href="">Logout</a>
            </button>
            <a href="./my-cart.html">
              <i className="fa-solid fa-cart-shopping shopping-cart-icon shopping-cart-icon-mobile"></i>
            </a>
            <a
              href="./admin/manage-users.html"
              id="admin-icon"
              className="admin-icon-mobile"
            >
              <i className="fa-solid fa-user"></i>
            </a>
          </div>

          <ul className="nav-mobile-menu">
            <a href="./index.html" className="menu-item active">
              <li>Home</li>
            </a>
            <a href="./about.html" className="menu-item">
              <li>About</li>
            </a>
            <a href="./services-category.html" className="menu-item">
              <li>Services</li>
            </a>
            <a href="./products-category.html" className="menu-item">
              <li>Products</li>
            </a>
          </ul>
        </div>
        <div className="wrapper-mobile-menu"></div>
      </nav>
    </header>
  );
}

export default ClientHeaderMobile;
