// Render Header Admin
function renderHeaderAdmin() {
  let headerAdmin = document.querySelector(".vertical-menu");
  headerAdminContent = "";
  headerAdminContent += `<div class="user-panel">
    <a href="http://127.0.0.1:5501/index.html"><img src="http://127.0.0.1:5501/assets/images/pet-shop.png" alt=""></a>
    <p class="user-title">admin</p>
  </div>
  
  <ul class="main-menu">
    <a href="http://127.0.0.1:5501/admin/manage-users.html" class="${
      window.location.href.includes(
        "http://127.0.0.1:5501/admin/manage-users.html"
      )
        ? "active"
        : ""
    }">
        <li><i class="fa-solid fa-user"></i>Manage Users
        </li>
    </a>
    <a href="http://127.0.0.1:5501/admin/manage-products.html" class="${
      window.location.href.includes(
        "http://127.0.0.1:5501/admin/manage-products.html"
      )
        ? "active"
        : ""
    }">
        <li><i class="fa-solid fa-boxes-stacked"></i>Manage Product</li>
    </a>
    <a href="http://127.0.0.1:5501/admin/manage-orders.html" class="${
      window.location.href.includes(
        "http://127.0.0.1:5501/admin/manage-orders.html"
      )
        ? "active"
        : ""
    }">
        <li><i class="fa-solid fa-cart-shopping"></i>Manage Orders</li>
    </a>
    <a onclick="handleLogoutAdminPage()">
        <li class="logout-admin-btn"><i class="fa-solid fa-right-from-bracket"></i>Logout</li>
    </a>
  </ul>`;
  headerAdmin.innerHTML = headerAdminContent;
}
renderHeaderAdmin();
