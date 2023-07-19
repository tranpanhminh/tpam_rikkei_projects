// Get Data của Accounts từ Local Storage về
const accountsDatabaseAdmin = JSON.parse(
  localStorage.getItem("accountsDatabase")
);
const authDatabaseManageUserPage = JSON.parse(localStorage.getItem("auth"));

if (
  (window.location.href.includes(
    "http://127.0.0.1:5501/admin/manage-users.html"
  ) &&
    !authDatabaseManageUserPage) ||
  authDatabaseManageUserPage.role !== "admin" ||
  (authDatabaseManageUserPage.role === "admin" &&
    authDatabaseManageUserPage.status === "Inactive")
) {
  window.location.href = "/index.html";
}

let userTitle = document.querySelector(".user-title");
userTitle.innerHTML = authDatabaseManageUserPage.fullName;

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
    <td>${accountsDatabaseAdmin[i].id}</td>
    <td>${accountsDatabaseAdmin[i].email}</td>
    <td>${accountsDatabaseAdmin[i].fullName}</td>
    <td>${
      accountsDatabaseAdmin[i].role === "admin" &&
      accountsDatabaseAdmin[i].id === 1
        ? "Super Admin"
        : accountsDatabaseAdmin[i].role
    }</td>
    <td class="user-status-check">${accountsDatabaseAdmin[i].status}</td>
    <td>
    <button class="change-user-btn" style="${
      accountsDatabaseAdmin[i].role === "admin" &&
      accountsDatabaseAdmin[i].id === 1
        ? "display:none"
        : ""
    }"onclick="handleChangeUser('${
      accountsDatabaseAdmin[i].email
    }')">Change</button>
    <button class="delete-user-btn" style="${
      accountsDatabaseAdmin[i].role === "admin" &&
      accountsDatabaseAdmin[i].id === 1
        ? "display:none"
        : ""
    }"onclick="handleDeleteUser('${
      accountsDatabaseAdmin[i].email
    }')">Delete</button></td>
</tr>`;
  }
  tableUser.innerHTML = tableUserContent;
}
renderManageUserPage(accountsDatabaseAdmin);

// Function thay đổi trạng thái User
function handleChangeUser(params) {
  const user = accountsDatabaseAdmin.find((item) => item.email === params);
  user.status = user.status === "Active" ? "Inactive" : "Active";
  const myArrayJson = JSON.stringify(accountsDatabaseAdmin);
  localStorage.setItem("accountsDatabase", myArrayJson);
  renderManageUserPage(accountsDatabaseAdmin);
}

// Function xóa user
function handleDeleteUser(email) {
  // Tìm chỉ mục của người dùng có email tương ứng
  const userIndex = accountsDatabaseAdmin.findIndex(
    (user) => user.email === email
  );
  console.log(userIndex);
  if (userIndex !== -1) {
    // Xóa người dùng khỏi mảng
    accountsDatabaseAdmin.splice(userIndex, 1);
    console.log(accountsDatabaseAdmin);

    // // Render lại trang Manage Users
    localStorage.setItem(
      "accountsDatabase",
      JSON.stringify(accountsDatabaseAdmin)
    );

    const toastLiveExample = document.getElementById(
      "liveToastDeleteUserNotify"
    );
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
  }

  renderManageUserPage(accountsDatabaseAdmin);
}

// Function tìm kiếm User
function handleSearchUser() {
  const accountsDatabaseAdmin = JSON.parse(
    localStorage.getItem("accountsDatabase")
  );
  let searchResult = document.querySelector(".search-result");
  let inputSearch = document.querySelector("#search-bar").value.toLowerCase();
  console.log(inputSearch);
  let filterUser = accountsDatabaseAdmin.filter(function (user) {
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

// Function thêm User
function handleSaveAddUser() {
  const accountsDatabase = JSON.parse(localStorage.getItem("accountsDatabase"));
  console.log(accountsDatabase);
  let userEmail = document.querySelector(".user-email-add").value;
  let userName = document.querySelector(".user-name-add").value;
  let userPassword = document.querySelector(".user-password-add").value;
  let userRole = document.querySelector("#user-role-add").value;
  let userStatus = document.querySelector("#user-status-add").value;

  let maxId = Math.max(
    ...accountsDatabase.map(function (account) {
      return account.id;
    })
  );

  let newUser = {
    id: accountsDatabase.length > 0 ? maxId + 1 : 1,
    email: userEmail,
    fullName: userName,
    password: userPassword,
    role: userRole,
    status: userStatus,
    cart: [],
    order_history: [],
  };

  const checkEmail = accountsDatabase.find((account) => {
    if (account.email === userEmail) {
      return true;
    }
  });

  if (userEmail === "" || userName === "" || userPassword === "") {
    const toastLiveExample = document.getElementById(
      "liveToastFillInformationUserNotify"
    );
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    setTimeout(function () {
      window.location.reload();
    }, 600);
    return;
  } else if (checkEmail) {
    const toastLiveExample = document.getElementById(
      "liveToastEmailUserIsExist"
    );
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    setTimeout(function () {
      window.location.reload();
    }, 600);
    return;
  } else {
    accountsDatabase.push(newUser);
  }

  localStorage.setItem("accountsDatabase", JSON.stringify(accountsDatabase));
  renderManageUserPage(accountsDatabase);

  // Modal Add User Notify
  const toastLiveExample = document.getElementById("liveToastAddUserNotify");
  bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();

  setTimeout(function () {
    window.location.reload();
  }, 600);
}
