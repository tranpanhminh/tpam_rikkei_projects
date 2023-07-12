const productDetail = JSON.parse(localStorage.getItem("productDetail"));
const accountsDatabase = JSON.parse(localStorage.getItem("accountsDatabase"));
const authDatabaseToCart = JSON.parse(localStorage.getItem("auth"));
const ordersDatabase = JSON.parse(localStorage.getItem("ordersDatabase"));

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const date = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
console.log(date);
// Function Render My Cart
function renderMyCart() {
  // Render User Info
  let userInfoSummary = document.querySelector("#user-info-summary");
  userInfoSummaryContent = "";
  userInfoSummaryContent += `<h2 class="cart-title">User Info</h2>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">User ID</h4>
      <input type="text" placeholder="${authDatabaseToCart.id}" disabled>
  </div>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Email</h4>
      <input type="text" placeholder="${authDatabaseToCart.email}" id="input-user-email" disabled>
  </div>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Name</h4>
      <input type="text" placeholder="${authDatabaseToCart.fullName}" id="input-user-fullname" disabled>
  </div>

  <button type="button" class="btn btn-primary edit-user-btn" onclick="handleEditUser(${authDatabaseToCart.id})">
      Edit User
  </button>`;

  userInfoSummary.innerHTML = userInfoSummaryContent;

  let tableMyCartElement = document.querySelector("#table-my-cart");
  let myCartSummary = document.querySelector("#my-cart-summary");
  let myCartSummaryContent = "";
  let tableMyCartElementContent = "";
  let total = 0;

  for (let i = 0; i < authDatabaseToCart.cart.length; i++) {
    tableMyCartElementContent += `
        <tr>
          <th>${i + 1}</th>
          <td><img src="${
            authDatabaseToCart.cart[i].productImage[0]
          }" alt=""></td>
          <td>${authDatabaseToCart.cart[i].name}</td>
          <td>
            <div class="td-flex">
              <i class="fa-solid fa-minus minus-product-icon" onclick="handleMinus(${i})"></i>
              <span class="product-cart-quantity-${i}">${Number(
      authDatabaseToCart.cart[i].quantity
    )}</span>
              <i class="fa-solid fa-plus plus-product-icon" onclick="handlePlus(${i})"></i>
            </div>
          </td>
          <td>$ ${authDatabaseToCart.cart[i].price.toLocaleString()}</td>
          <td>$ ${(
            Number(authDatabaseToCart.cart[i].quantity) *
            Number(authDatabaseToCart.cart[i].price)
          ).toLocaleString()}</td>
          <td><i class="fa-solid fa-xmark delete-product-icon" onclick="handleRemoveFromCart(${i})"></i></td>
        </tr>`;

    let itemTotal =
      Number(authDatabaseToCart.cart[i].quantity) *
      Number(authDatabaseToCart.cart[i].price);
    total += itemTotal;
  }
  myCartSummaryContent = `<h2 class="cart-title">Summary</h2>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Phone</h4>
      <input type="number" placeholder="" id="input-phone">
  </div>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Address</h4>
      <input type="text" placeholder="" id="input-address">
  </div>

  <div class="card-total">
      <span class="cart-quantity-item">Item: ${
        authDatabaseToCart.cart.length
      }</span>
      <span class="cart-total-quantity">Total: $${total.toLocaleString()}</span>
  </div>

  <button type="button" class="btn btn-primary order-btn" onclick="handleOrder()">
      ORDER
  </button>`;
  tableMyCartElement.innerHTML = tableMyCartElementContent;
  myCartSummary.innerHTML = myCartSummaryContent;
}

if (authDatabaseToCart) {
  renderMyCart();
}

// Cộng và giảm số lượng
function handlePlus(i) {
  let productQuantity = document.querySelector(`.product-cart-quantity-${i}`);
  console.log(productQuantity.value);
  productQuantity += 1;
}

// Function Order

let order = [];
function handleOrder() {
  let newCart = [];
  for (let i = 0; i < authDatabaseToCart.cart.length; i++) {
    console.log(authDatabaseToCart.cart[i]);
    let cartItem = {
      productID: authDatabaseToCart.cart[i].id,
      productImage: authDatabaseToCart.cart[i].productImage[0],
      productName: authDatabaseToCart.cart[i].name,
      productQuantity: authDatabaseToCart.cart[i].quantity,
      productPrice: authDatabaseToCart.cart[i].price,
    };
    newCart.push(cartItem);
  }

  let inputPhone = Number(document.querySelector("#input-phone").value);
  let inputAddress = document.querySelector("#input-address").value;

  const maxId = Math.max(...ordersDatabase.map((item) => item.id));

  let newOrder = {
    id: maxId + 1,
    user_id: authDatabaseToCart.id,
    name: authDatabaseToCart.fullName,
    email: authDatabaseToCart.email,
    phone: Number(inputPhone),
    date: date,
    status: "Processing",
    address: inputAddress,
    cart: newCart,
  };

  console.log("NewOrder", newOrder);
  if (inputPhone == "" || inputAddress == "") {
    alert("Please fill Phone and Address");
    return;
  } else {
    ordersDatabase.push(newOrder);
    console.log(ordersDatabase);
    alert("Order Complete!");
    authDatabaseToCart.cart = [];
    console.log(authDatabaseToCart);
    localStorage.setItem(
      "authDatabaseToCart",
      JSON.stringify(authDatabaseToCart)
    );
    localStorage.setItem("auth", JSON.stringify(authDatabaseToCart));
  }

  localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));
  renderMyCart();
}

function handleEditUser(userId) {
  // Change the onclick attribute of the button to handleSaveUser
  document
    .querySelector("#user-info-summary button")
    .setAttribute("onclick", "handleSaveUser(" + userId + ")");

  // Change the text of the button to "Save changes"
  document.querySelector("#user-info-summary button").textContent =
    "Save changes";

  // Remove the disabled attribute from the input fields
  document.querySelector("#input-user-fullname").removeAttribute("disabled");
}

function handleSaveUser(userId) {
  const userIndex = accountsDatabase.findIndex(
    (user) => user.id === userId
  );
  let inputEmail = document.querySelector("#input-user-email");
  let inputFullName = document.querySelector("#input-user-fullname");
  let inputEmailValue = inputEmail.value;
  let inputFullNameValue = inputFullName.value;

  if (inputEmailValue === "") {
    inputEmailValue = authDatabaseToCart.email;
    inputEmailValue = accountsDatabase[userIndex].email;
  } else {
    authDatabaseToCart.email = inputEmailValue;
    accountsDatabase[userIndex].email = inputEmailValue;
  }

  if (inputFullNameValue === "") {
    inputFullNameValue = authDatabaseToCart.fullName;
    inputFullNameValue = accountsDatabase[userIndex].fullName;
  } else {
    authDatabaseToCart.fullName = inputFullNameValue;
    accountsDatabase[userIndex].fullName = inputFullNameValue;
  }

  // Change the onclick attribute of the button to handleEditUser
  document
    .querySelector("#user-info-summary button")
    .setAttribute("onclick", "handleEditUser(" + userIndex + ")");

  // Change the text of the button to "Edit User"
  document.querySelector("#user-info-summary button").textContent = "Edit User";

  // Add the disabled attribute to the input fields
  document
    .querySelector("#input-user-fullname")
    .setAttribute("disabled", "disabled");
  localStorage.setItem("accountsDatabase", JSON.stringify(accountsDatabase));
  localStorage.setItem("auth", JSON.stringify(authDatabaseToCart));
  localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));

  console.log("Accounts DataBase", accountsDatabase);
  renderMyCart();
}
