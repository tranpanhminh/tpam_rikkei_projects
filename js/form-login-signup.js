const accountsDatabase = getDataFromLocal("accountsDatabase") ?? [];

// Function Signup
function handleSignUp() {
  let inputEmail = document.querySelector(".input-email").value;
  let inputFullName = document.querySelector(".input-fullname").value;
  let inputPassword = document.querySelector(".input-password").value;
  let inputRePassword = document.querySelector(".input-repassword").value;
  let emailNotify = document.querySelector(".email-notify");
  let passwordNotify = document.querySelector(".password-notify");
  let rePasswordNotify = document.querySelector(".repassword-notify");
  let signUpCompleteNotify = document.querySelector(".sign-up-complete-notify");

  let newUser = "";

  if (inputEmail == "" || inputPassword == "" || inputRePassword == "") {
    alert("Please fill the form!");
    return;
  }

  for (let i = 0; i < accountsDatabase.length; i++) {
    if (inputEmail === accountsDatabase[i].email) {
      alert("Email is exist");
      return;
    }
  }

  if (inputPassword == inputRePassword) {
    newUser = {
      email: inputEmail,
      fullName: inputFullName,
      password: inputPassword,
      role: "customer",
      status: "Active",
      cart: [],
    };
    signUpCompleteNotify.style.display = "block";
    accountsDatabase.push(newUser);
    document.querySelector(".input-email").value = "";
    document.querySelector(".input-fullname").value = "";
    document.querySelector(".input-password").value = "";
    document.querySelector(".input-repassword").value = "";
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
  let inputEmail = document.querySelector("#input-login-email").value;
  let inputPassword = document.querySelector("#input-login-password").value;
  let adminPanel = document.querySelector(".admin-icon");
  if (inputEmail == "" || inputPassword == "") {
    alert("Please fill the form!");
    return;
  }
  const userIndex = accountsDatabase.find((user) => user.email === inputEmail);
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
    alert("Email hoặc mật khẩu không đúng!");
    return;
  }
}

function handlePreventForm(event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form
  // Các xử lý khác khi form được gửi đi
}
