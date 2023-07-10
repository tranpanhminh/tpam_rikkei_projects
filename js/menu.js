const openMenu = document.querySelector(".open");
const overlay = document.querySelector(".wrapper-mobile-menu");
const menuMobile = document.querySelector(".menu-mobile");
const hideMenuMobile = document.querySelector(".icon-close-menu");

openMenu.addEventListener("click", () => {
  overlay.classList.add("active");
  menuMobile.classList.add("active");
});

overlay.addEventListener("click", (e) => {
  overlay.classList.remove("active");
  menuMobile.classList.remove("active");
});

hideMenuMobile.addEventListener("click", (e) => {
  overlay.classList.remove("active");
  menuMobile.classList.remove("active");
});
