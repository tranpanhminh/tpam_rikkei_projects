const accountsDatabase = getDataFromLocal("accountsDatabase") ?? [];

// Function Signup
function handleSignUp() {
  console.log(accountsDatabase);
  let inputEmail = document.querySelector(".input-email").value;
  let inputFullName = document.querySelector(".input-fullname").value;
  let inputPassword = document.querySelector(".input-password").value;
  let inputRePassword = document.querySelector(".input-repassword").value;
  let emailNotify = document.querySelector(".email-notify");
  let passwordNotify = document.querySelector(".password-notify");
  let rePasswordNotify = document.querySelector(".repassword-notify");
  let signUpCompleteNotify = document.querySelector(".sign-up-complete-notify");

  let emailExists = false; // Biến cờ để ghi nhận xem đã tìm thấy email trùng khớp hay chưa

  for (let i = 0; i < accountsDatabase.length; i++) {
    if (inputEmail === accountsDatabase[i].email) {
      emailExists = true;
      console.log(emailExists);
      break; // Thoát khỏi vòng lặp khi tìm thấy email trùng khớp
    }
  }

  if (emailExists) {
    console.log("Cl 3", emailExists);
    emailNotify.innerHTML = "Email already exists!";
  }

  if (inputPassword === inputRePassword) {
    signUpCompleteNotify.style.display = "block";
    emailNotify.style.display = "none";
    passwordNotify.style.display = "none";
    rePasswordNotify.style.display = "none";
  } else {
    passwordNotify.innerHTML = "Password & Confirm Password must match!";
    rePasswordNotify.innerHTML = "Password & Confirm Password must match!";
  }

  let newUser = {
    email: inputEmail,
    fullName: inputFullName,
    password: inputPassword,
    role: "customer",
    cart: [],
  };

  accountsDatabase.push(newUser);
  setDataToLocal("accountsDatabase", accountsDatabase);
  console.log(accountsDatabase);
}

function handlePreventForm(event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form
  // Các xử lý khác khi form được gửi đi
}
