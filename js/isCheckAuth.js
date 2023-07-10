let auth = JSON.parse(localStorage.getItem("auth"));
let adminPanel = document.querySelector("#admin-icon");
let loginBtn = document.querySelector(".login-btn");
let signupBtn = document.querySelector(".signup-btn");

let logoutBtn = document.querySelector(".logout-btn");
let cartIcon = document.querySelector(".shopping-cart-icon");

if (auth && auth.role === "admin") {
  adminPanel.style.display = "inline-block";
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";
  cartIcon.style.display = "none";
  logoutBtn.style.display = "inline-block";
}

if (auth && auth.role === "customer") {
  adminPanel.style.display = "none";
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  cartIcon.style.display = "inline-block";
}
