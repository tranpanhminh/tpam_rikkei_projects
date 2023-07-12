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
              <input oninput="handleChangeQuantity(${
                authDatabaseToCart.cart[i].id
              },this.value)" type="number" min="1" class="product-cart-quantity product-cart-quantity-${
      authDatabaseToCart.cart[i].id
    }" value="${Number(authDatabaseToCart.cart[i].quantity)}">
            </div>
          </td>
          <td>$ ${authDatabaseToCart.cart[i].price.toLocaleString()}</td>
          <td>$ ${(
            Number(authDatabaseToCart.cart[i].quantity) *
            Number(authDatabaseToCart.cart[i].price)
          ).toLocaleString()}</td>
          <td><i class="fa-solid fa-xmark delete-product-icon" onclick="handleRemoveFromCart(${
            authDatabaseToCart.cart[i].id
          })"></i></td>
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

// Cộng , giảm số lượng và xóa ra khỏi giỏ hàng
function handleChangeQuantity(productId, value) {
  console.log(productId, value);
  if (value > 0) {
    const productIndex = authDatabaseToCart.cart.map((product) => {
      if (product.id == productId) {
        return {
          ...product,
          quantity: Number(value),
          quantity_stock: product.quantity_stock - Number(value),
        };
      } else {
        return product;
      }
    });
    console.log(productIndex);
    authDatabaseToCart.cart = productIndex;
    accountsDatabase.map((item) => {
      if (item.id == authDatabaseToCart.id) {
        item.cart = productIndex;
      }
    });
    localStorage.setItem("auth", JSON.stringify(authDatabaseToCart));
    localStorage.setItem("accountsDatabase", JSON.stringify(accountsDatabase));
    renderMyCart();
  }
}

function handleRemoveFromCart(productId) {
  // Tìm sản phẩm trong giỏ hàng dựa trên productId
  const productIndex = authDatabaseToCart.cart.findIndex(
    (product) => product.id === productId
  );

  // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng hay không
  if (productIndex !== -1) {
    // Xóa sản phẩm khỏi giỏ hàng
    authDatabaseToCart.cart.splice(productIndex, 1);

    // Cập nhật lại dữ liệu lên local storage
    localStorage.setItem("auth", JSON.stringify(authDatabaseToCart));

    // Cập nhật giao diện
    renderMyCart(); // Hàm renderCart() làm nhiệm vụ cập nhật lại giao diện giỏ hàng sau khi xóa sản phẩm
  }
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
  // console.log((authDatabaseToCart.cart.length === 0));
  if (
    authDatabaseToCart.cart.length === 0 ||
    inputPhone == "" ||
    inputAddress == ""
  ) {
    alert(
      "Please check and make sure that your cart is not empty & you have entered all phone & address"
    );
    return;
  } else {
    ordersDatabase.push(newOrder);
    alert("Order Complete!");
    authDatabaseToCart.order_history.push(...authDatabaseToCart.cart);
    authDatabaseToCart.cart = [];
    accountsDatabase.map((item) => {
      if (item.id == authDatabaseToCart.id) {
        item.order_history = authDatabaseToCart.order_history;
        item.cart = authDatabaseToCart.cart;
      }
    });
    console.log(authDatabaseToCart);
    localStorage.setItem("auth", JSON.stringify(authDatabaseToCart));
    localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));
    localStorage.setItem("accountsDatabase", JSON.stringify(accountsDatabase));
  }

  renderMyCart();
  renderOrderHistory();
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
  const userIndex = accountsDatabase.findIndex((user) => user.id === userId);
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

  renderMyCart();
}

// Function Render Order History
function renderOrderHistory() {
  const ordersDatabase = JSON.parse(localStorage.getItem("ordersDatabase"));

  let tableOrderHistory = document.querySelector("#table-order-history");
  let tableOrderHistoryContent = "";
  let filterOrderHistory = ordersDatabase.filter((order) => {
    if (authDatabaseToCart.id === order.user_id) {
      return true;
    }
    return false;
  });
  console.log(filterOrderHistory);
  const orderHistoryUser = filterOrderHistory.reduce((result, item) => {
    let data = item;
    let newData = item.cart.map((i) => {
      return { ...i, date: data.date };
    });
    return [...result, ...newData];
  }, []);
  console.log(orderHistoryUser);
  orderHistoryUser.forEach((item, index) => {
    console.log(item);
    tableOrderHistoryContent += `<tr>
    <th>${index + 1}</th>
    <td><img src="${item.productImage}" alt=""></td>
    <td>${item.productName}</td>
    <td>
        <span class="product-cart-quantity">${item.productQuantity}</span>
    </td>
    <td>${item.productPrice}</td>
    <td>${Number(item.productQuantity) * Number(item.productPrice)}</td>
    <td>${item.date}</td>
</tr>`;
  });

  tableOrderHistory.innerHTML = tableOrderHistoryContent;
}
renderOrderHistory();
