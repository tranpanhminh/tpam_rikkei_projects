let auth = JSON.parse(localStorage.getItem("auth"));
console.log(auth);
let adminPanel = document.querySelector("#admin-icon");
let loginBtn = document.querySelector(".login-btn");
let signupBtn = document.querySelector(".signup-btn");
let logoutBtn = document.querySelector(".logout-btn");

if (auth && auth.role === "admin") {
  adminPanel.style.display = "inline-block";
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
}

if (auth && auth.role === "customer") {
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
}
