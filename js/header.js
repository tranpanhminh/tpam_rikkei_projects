// Render Header PC
function renderHeaderPC() {
  let menuPC = document.querySelector(".main-menu");
  menuPCContent = "";
  menuPCContent += `<div class="logo">
  <a href="/index.html"><img src="/assets/images/pet-shop-remove-bg.png" alt="Logo Petshop"
          class="logo-petshop"></a>
</div>

<div class="menu">
  <ul class="nav-main-menu">
  <li><a href="/index.html" class="menu-item ${
    window.location.href.includes("/index.html") ? "active" : ""
  }">Home</a></li>
  <li><a href="/about.html" class="menu-item ${
    window.location.href.includes("/about.html") ? "active" : ""
  }">About</a></li>
  <li><a href="/products-category.html" class="menu-item ${
    window.location.href.includes("/products-category.html") ? "active" : ""
  }">Products</a></li>
  </ul>
</div>

<div class="search-bar">
  <input type="text" placeholder="Search" id="search-bar">
  <i class="fa-solid fa-magnifying-glass" id="search-icon" onclick="handleSearch()"></i>
</div>

<div class="group-user">
  <a href="/login-page.html"><button class="login-btn my-button ${
    window.location.href.includes("/login-page.html") ? "btn-active" : ""
  }">Login</button></a>
  <a href="/signup-page.html"><button class="signup-btn my-button ${
    window.location.href.includes("/signup-page.html") ? "btn-active" : ""
  }">Signup</button></a>
  <button class="logout-btn my-button" onclick="handleLogout()"><a href="">Logout</a></button>
  <a href="/my-cart.html"><i class="fa-solid fa-cart-shopping shopping-cart-icon"></i></a>
  <a href="/admin/manage-users.html" id="admin-icon"><i class="fa-solid fa-user"></i></a>
</div>`;

  menuPC.innerHTML = menuPCContent;
}
renderHeaderPC();

// Render Header Mobile
function renderHeaderMobile() {
  let menuMobile = document.querySelector(".main-menu-mobile");
  menuMobileContent = "";
  menuMobileContent += `            <div class="logo">
  <a href="/index.html"><img src="/assets/images/pet-shop-remove-bg.png" alt="Logo Petshop"
          class="logo-petshop"></a>
</div>

<div class="group-user">
  <i class="fa-solid fa-cart-shopping shopping-cart-icon"></i>
  <i class="fa-solid fa-bars icon-bar-menu open"></i>
</div>

<div class="menu-mobile">
  <i class="fa-solid fa-xmark icon-close-menu close"></i>

  <div class="group-search">
      <input type="text" placeholder="Search" id="search-bar" class="search-bar-mobile">
      <i class="fa-solid fa-magnifying-glass" id="search-icon" onclick="handleSearchMobile()"></i>
  </div>

  <div class="group-btn-user">
      <a href="/login-page.html"><button class="login-btn my-button login-btn-mobile ${
        window.location.href.includes("/login-page.html") ? "btn-active" : ""
      }">Login</button></a>
      <a href="/signup-page.html"><button
              class="signup-btn my-button signup-btn-mobile ${
                window.location.href.includes("/signup-page.html")
                  ? "btn-active"
                  : ""
              }">Signup</button></a>
      <button class="logout-btn my-button logout-btn-mobile" onclick="handleLogout()"><a
              href="">Logout</a></button>
      <a href="/my-cart.html"><i
              class="fa-solid fa-cart-shopping shopping-cart-icon shopping-cart-icon-mobile"></i></a>
      <a href="/admin/manage-users.html" id="admin-icon" class="admin-icon-mobile"><i
              class="fa-solid fa-user"></i></a>
  </div>


  <ul class="nav-mobile-menu">
      <a href="/index.html" class="menu-item ${
        window.location.href.includes("/index.html") ? "active" : ""
      }">
          <li>Home</li>
      </a></li>
      <a href="/about.html" class="menu-item ${
        window.location.href.includes("/about.html") ? "active" : ""
      }">
          <li>About</li>
      </a>
      <a href="/products-category.html" class="menu-item ${
        window.location.href.includes("/products-category.html") ? "active" : ""
      }">
          <li>Products</li>
      </a>
  </ul>
</div>
<div class="wrapper-mobile-menu">
</div>`;

  menuMobile.innerHTML = menuMobileContent;
}
renderHeaderMobile();
