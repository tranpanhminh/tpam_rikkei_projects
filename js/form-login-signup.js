const accountsDatabase = getDataFromLocal("accountsDatabase") ?? [];
const authDatabaseLoginPage = JSON.parse(localStorage.getItem("auth"));

if (authDatabaseLoginPage) {
  window.location.href = "http://127.0.0.1:5501/index.html";
}
// Function Signup
function handleSignUp() {
  let inputEmail = document.querySelector(".input-email").value;
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
    // Modal Fill All Informatino Sign Up Notify
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

  // Kiểm tra inputFullName
  const fullNameRegex = /^[a-zA-Z\s]*$/;
  if (!fullNameRegex.test(inputFullName)) {
    fullNameNotify.innerHTML =
      "Full Name does not include numbers & special characters";
    fullNameNotify.style.display = "block";
    return;
  }

  if (inputPassword == inputRePassword) {
    const maxId = Math.max(...accountsDatabase.map((account) => account.id));
    console.log("MaxId", maxId);

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

    // Modal Signup Complete
    const toastLiveExample = document.getElementById("liveToastSignUpComplete");
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();

    setTimeout(() => {
      window.location.href = "http://127.0.0.1:5501/login-page.html";
    }, 800); // Đợi 0.8 giây trước khi chuyển hướng
  } else {
    passwordNotify.innerHTML = "Passwword and Repassword does not match";
    rePasswordNotify.innerHTML = "Passwword and Repassword does not match";
    passwordNotify.style.display = "block";
    rePasswordNotify.style.display = "block";
    return;
  }

  setDataToLocal("accountsDatabase", accountsDatabase);
}

// Function handleLogin
function handleLogin() {
  const toastBody = document.querySelector(".toast-body");
  let inputEmail = document.querySelector("#input-login-email").value;
  let inputPassword = document.querySelector("#input-login-password").value;
  let adminPanel = document.querySelector(".admin-icon");
  if (inputEmail == "" || inputPassword == "") {
    // Modal Fill Information Login
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

function handlePreventForm(event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form
  // Các xử lý khác khi form được gửi đi
}
