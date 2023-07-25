const accountsDatabase = getDataFromLocal("accountsDatabase") ?? [];
const authDatabaseLoginPage = JSON.parse(localStorage.getItem("auth"));

if (authDatabaseLoginPage) {
  window.location.href = "/index.html";
}
// Function Signup
function handleSignUp() {
  let inputEmail = document.querySelector(".input-email").value.toLowerCase();
  let inputFullName = document.querySelector(".input-fullname").value;
  let inputPassword = document.querySelector(".input-password").value;
  let inputRePassword = document.querySelector(".input-repassword").value;
  let emailNotify = document.querySelector(".email-notify");
  let fullNameNotify = document.querySelector(".fullname-notify");
  let passwordNotify = document.querySelector(".password-notify");
  let rePasswordNotify = document.querySelector(".repassword-notify");
  let signUpCompleteNotify = document.querySelector(".sign-up-complete-notify");

  let newUser = "";

  if (inputEmail == "" || inputPassword == "" || inputRePassword == "") {
    // Hiển thị thông báo người dùng cần điền đầy đủ thông tin
    const toastLiveExample = document.getElementById(
      "liveToastFillAllFormSignUp"
    );
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    return;
  }

  for (let i = 0; i < accountsDatabase.length; i++) {
    if (inputEmail === accountsDatabase[i].email) {
      emailNotify.innerHTML = "Email is exist";
      emailNotify.style.display = "block";
      return;
    }
  }

  // Full Name phải là ký tự chữ không được chứa số
  // Kiểm tra inputFullName
  const fullNameRegex = /^[a-zA-Z\s]*$/;
  if (!fullNameRegex.test(inputFullName)) {
    fullNameNotify.innerHTML =
      "Full Name must not include numbers & special characters";
    fullNameNotify.style.display = "block";
    return;
  }

  // Kiểm tra email phải đúng định dạng
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inputEmail)) {
    emailNotify.innerHTML = "Invalid email format";
    emailNotify.style.display = "block";
    return;
  }

  if (inputPassword === inputRePassword) {
    const maxId = Math.max(...accountsDatabase.map((account) => account.id));

    newUser = {
      id: maxId + 1,
      email: inputEmail,
      fullName: inputFullName,
      password: inputPassword,
      role: "customer",
      status: "Active",
      cart: [],
      order_history: [],
    };
    accountsDatabase.push(newUser);

    document.querySelector(".input-email").value = "";
    document.querySelector(".input-fullname").value = "";
    document.querySelector(".input-password").value = "";
    document.querySelector(".input-repassword").value = "";
    passwordNotify.style.display = "none";
    rePasswordNotify.style.display = "none";
    fullNameNotify.style.display = "none";
    emailNotify.style.display = "none";

    // Hiển thị thông báo Đăng ký thành công!
    const toastLiveExample = document.getElementById("liveToastSignUpComplete");
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();

    setTimeout(() => {
      window.location.href = "/login-page.html";
    }, 800); // Đợi 0.8 giây trước khi chuyển hướng sang trang đăng nhập
  } else {
    passwordNotify.innerHTML = "Passwword and Repassword does not match";
    rePasswordNotify.innerHTML = "Passwword and Repassword does not match";
    passwordNotify.style.display = "block";
    rePasswordNotify.style.display = "block";
    return;
  }

  setDataToLocal("accountsDatabase", accountsDatabase);
}

// Function đăng nhập
function handleLogin() {
  const toastBody = document.querySelector(".toast-body");
  let inputEmail = document
    .querySelector("#input-login-email")
    .value.toLowerCase();
  let inputPassword = document.querySelector("#input-login-password").value;
  let adminPanel = document.querySelector(".admin-icon");
  if (inputEmail == "" || inputPassword == "") {
    // HIển thị thông báo người dùng cần nhập đầy đủ thông tin

    const toastLiveExample = document.getElementById(
      "liveToastFillAllFormLogin"
    );
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    return;
  }

  const emailExist = accountsDatabase.find((user) => {
    return user.email === inputEmail;
  });

  if (!emailExist) {
    const toastLiveExample = document.getElementById(
      "liveToastFillAllFormLogin"
    );
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    toastBody.innerHTML = "Email is not exist";
    return;
  }

  const userIndex = accountsDatabase.find((user) => {
    return user.email === inputEmail && user.password === inputPassword;
  });
  // Đăng nhập dành cho Admin
  if (userIndex) {
    // console.log(userIndex);
    // alert("Đăng nhập thành công!");
    document.querySelector("#input-login-email").value = "";
    document.querySelector("#input-login-password").value = "";
    const myArrayJson = JSON.stringify(userIndex);
    // console.log(myArrayJson);
    localStorage.setItem("auth", myArrayJson);
    window.location.href = "index.html";
  } else {
    const toastLiveExample = document.getElementById(
      "liveToastFillAllFormLogin"
    );
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    toastBody.innerHTML = "Email or Password is not correct!";
    return;
  }
}

// Function chặn hành động gửi form
function handlePreventForm(event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form
  // Các xử lý khác khi form được gửi đi
}
