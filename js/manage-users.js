// Get Data của Accounts từ Local Storage về
const accountsDatabaseAdmin = getDataFromLocal("accountsDatabase") ?? [];

// Function Render Accounts vào Manage Users
function renderManageUserPage(accountsDatabaseAdmin) {
  let tableUser = document.querySelector("#table-user");
  let tableUserContent = "";
  tableUserContent = `<tr>
  <td>STT</td>
  <td>Email</td>
  <td>Full Name</td>
  <td>Role</td>
  <td>Status</td>
  <td>Action</td>
</tr>`;
  for (let i = 0; i < accountsDatabaseAdmin.length; i++) {
    tableUserContent += `<tr>
    <td>${i + 1}</td>
    <td>${accountsDatabaseAdmin[i].email}</td>
    <td>${accountsDatabaseAdmin[i].fullName}</td>
    <td>${accountsDatabaseAdmin[i].role}</td>
    <td class="user-status-check">${accountsDatabaseAdmin[i].status}</td>
    <td>
    <button class="change-user-btn" style="${
      accountsDatabaseAdmin[i].role === "admin" ? "display:none" : ""
    }"onclick="handleChangeUser('${
      accountsDatabaseAdmin[i].email
    }')">Change</button>
    <button class="delete-user-btn" style="${
      accountsDatabaseAdmin[i].role === "admin" ? "display:none" : ""
    }"onclick="handleDeleteUser('${
      accountsDatabaseAdmin[i].email
    }')">Delete</button></td>
</tr>`;
  }
  tableUser.innerHTML = tableUserContent;
}
renderManageUserPage(accountsDatabaseAdmin);
// console.log(accountsDatabaseAdmin);
function handleChangeUser(params) {
  console.log(params);
  const user = accountsDatabaseAdmin.find((item) => item.email === params);

  user.status = user.status === "Active" ? "Inactive" : "Active";
  // console.log(accountsDatabaseAdmin);
  const myArrayJson = JSON.stringify(accountsDatabaseAdmin);
  localStorage.setItem("accountsDatabase", myArrayJson);
  renderManageUserPage(accountsDatabaseAdmin);
}

// Function Delete User
function handleDeleteUser(email) {
  const accountsDatabase = getDataFromLocal("accountsDatabase") ?? [];

  // Tìm chỉ mục của người dùng có email tương ứng
  const userIndex = accountsDatabase.findIndex((user) => user.email === email);
  console.log(userIndex);
  if (userIndex !== -1) {
    
    // Xóa người dùng khỏi mảng
    accountsDatabase.splice(userIndex, 1);
    console.log(accountsDatabase);
    // // Cập nhật dữ liệu trong Local Storage
    // setDataToLocal("accountsDatabase", accountsDatabase);

    // // Render lại trang Manage Users
    const myArrayJson = JSON.stringify(accountsDatabase);
    localStorage.setItem("accountsDatabase", myArrayJson);
    renderManageUserPage(accountsDatabase);
  }
}

// Function Search Product
function handleSearchUser() {
  const accountsDatabase = JSON.parse(localStorage.getItem("accountsDatabase"));
  let searchResult = document.querySelector(".search-result");
  let inputSearch = document.querySelector("#search-bar").value.toLowerCase();
  console.log(inputSearch);
  let filterUser = accountsDatabase.filter(function (user) {
    if (
      user.email.toLowerCase().includes(inputSearch) ||
      user.fullName.toLowerCase().includes(inputSearch) ||
      user.role.toLowerCase().includes(inputSearch) ||
      user.status.toLowerCase().includes(inputSearch)
    ) {
      return true;
    }
    return false;
  });
  console.log(filterUser);
  searchResult.innerHTML = `There are ${filterUser.length} results`;
  searchResult.style.display = "block";
  renderManageUserPage(filterUser);
}
