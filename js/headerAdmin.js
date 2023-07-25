// Render Header Admin
function renderHeaderAdmin() {
  let headerAdmin = document.querySelector(".vertical-menu");
  headerAdminContent = "";
  headerAdminContent += `<div class="user-panel">
    <a href="/index.html"><img src="/assets/images/pet-shop.png" alt=""></a>
    <p class="user-title">admin</p>
  </div>
  
  <ul class="main-menu">
    <a href="/admin/manage-users.html" class="${
      window.location.href.includes("/admin/manage-users.html") ? "active" : ""
    }">
        <li><i class="fa-solid fa-user"></i>Manage Users
        </li>
    </a>
    <a href="/admin/manage-products.html" class="${
      window.location.href.includes("/admin/manage-products.html")
        ? "active"
        : ""
    }">
        <li><i class="fa-solid fa-boxes-stacked"></i>Manage Product</li>
    </a>
    <a href="/admin/manage-orders.html" class="${
      window.location.href.includes("/admin/manage-orders.html") ? "active" : ""
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
