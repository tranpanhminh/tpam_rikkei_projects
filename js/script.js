// Lấy danh sách các mục menu
const menuItems = document.querySelectorAll(".menu-item");

// Lặp qua các mục menu và thêm sự kiện click
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Xóa lớp active cho tất cả các mục menu
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });

    // Thêm lớp active cho mục menu được chọn
    item.classList.add("active");
    console.log(item);
  });
});
