import React, { useEffect } from "react";
import logo from "../../../../assets/images/pet-shop-remove-bg.png";

function ClientHeaderPC() {
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

  const handleSearch = () => {
    console.log("Searched");
  };

  const handleLogout = () => {
    console.log("Log out");
  };

  return (
    <header>
      <nav className="main-menu">
        <div className="logo">
          <a href="/index.html">
            <img src={logo} alt="Logo Petshop" className="logo-petshop" />
          </a>
        </div>
        <div className="menu">
          <ul className="nav-main-menu">
            <li>
              <a
                href="/index.html"
                className={`menu-item ${
                  window.location.href.includes("/index.html") ? "active" : ""
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about.html"
                className={`menu-item ${
                  window.location.href.includes("/about.html") ? "active" : ""
                }`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/services-category.html"
                className={`menu-item ${
                  window.location.href.includes("/services-category.html")
                    ? "active"
                    : ""
                }`}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/products-category.html"
                className={`menu-item ${
                  window.location.href.includes("/products-category.html")
                    ? "active"
                    : ""
                }`}
              >
                Products
              </a>
            </li>
          </ul>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" id="search-bar" />
          <i
            className="fa-solid fa-magnifying-glass"
            id="search-icon"
            onClick={handleSearch}
          ></i>
        </div>
        <div className="group-user">
          <a href="/login-page.html">
            <button
              className={`login-btn my-button ${
                window.location.href.includes("/login-page.html")
                  ? "btn-active"
                  : ""
              }`}
            >
              Login
            </button>
          </a>
          <a href="/signup-page.html">
            <button
              className={`signup-btn my-button ${
                window.location.href.includes("/signup-page.html")
                  ? "btn-active"
                  : ""
              }`}
            >
              Signup
            </button>
          </a>
          <button className="logout-btn my-button" onClick={handleLogout}>
            <a href="/">Logout</a>
          </button>
          <a href="/my-cart.html">
            <i className="fa-solid fa-cart-shopping shopping-cart-icon"></i>
          </a>
          <a href="/admin/manage-users.html" id="admin-icon">
            <i className="fa-solid fa-user"></i>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default ClientHeaderPC;
