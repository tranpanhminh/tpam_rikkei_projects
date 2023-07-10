let auth = JSON.parse(localStorage.getItem("auth"));
// PC

let adminPanel = document.querySelector("#admin-icon");
let loginBtn = document.querySelector(".login-btn");
let signupBtn = document.querySelector(".signup-btn");
let logoutBtn = document.querySelector(".logout-btn");
let cartIcon = document.querySelector(".shopping-cart-icon");

// Mobile & Tablet
let adminPanelMobile = document.querySelector(".admin-icon-mobile");
let loginBtnMobile = document.querySelector(".login-btn-mobile");
let signupBtnMobile = document.querySelector(".signup-btn-mobile");
let logoutBtnMobile = document.querySelector(".logout-btn-mobile");
let cartIconMobile = document.querySelector(".shopping-cart-icon-mobile");

if (auth && auth.role === "admin") {
  // PC
  adminPanel.style.display = "inline-block";
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";
  cartIcon.style.display = "none";
  logoutBtn.style.display = "inline-block";
  // Mobile & Tablet
  adminPanelMobile.style.display = "inline-block";
  loginBtnMobile.style.display = "none";
  signupBtnMobile.style.display = "none";
  cartIconMobile.style.display = "none";
  logoutBtnMobile.style.display = "inline-block";
}

if (auth && auth.role === "customer") {
  // PC
  adminPanel.style.display = "none";
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  cartIcon.style.display = "inline-block";
  // Mobile & Tablet
  adminPanelMobile.style.display = "none";
  loginBtnMobile.style.display = "none";
  signupBtnMobile.style.display = "none";
  logoutBtnMobile.style.display = "inline-block";
  cartIconMobile.style.display = "inline-block";
}
