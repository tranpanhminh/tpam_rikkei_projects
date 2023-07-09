// Funtion Logout
function handleLogout() {
  localStorage.removeItem("auth");
  let adminPanel = document.querySelector("#admin-icon");
  let loginBtn = document.querySelector(".login-btn");
  let signupBtn = document.querySelector(".signup-btn");
  let logoutBtn = document.querySelector(".logout-btn");
  adminPanel.style.display = "none";
  loginBtn.style.display = "inline-block";
  signupBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
  window.location.href = "index.html";
}

function handleLogoutAdminPage() {
  localStorage.removeItem("auth");
  window.location.href = "http://127.0.0.1:5501/index.html";
}
