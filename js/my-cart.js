const productDetail = JSON.parse(localStorage.getItem("productDetail"));
const accountsDatabase = JSON.parse(localStorage.getItem("accountsDatabase"));
const authDatabaseToCart = JSON.parse(localStorage.getItem("auth"));
const ordersDatabase = JSON.parse(localStorage.getItem("ordersDatabase"));
const productsDatabaseToCart = JSON.parse(
  localStorage.getItem("productsDatabase")
);

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const date = day + "/" + month + "/" + year + " " + hours + ":" + minutes;

if (
  window.location.href.includes("http://127.0.0.1:5501/my-cart.html") &&
  !authDatabaseToCart
) {
  window.location.href = "/index.html";
}

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
              <input onchange="handleChangeQuantity(${
                authDatabaseToCart.cart[i].id
              },this.value)" type="number" min="1" class="product-cart-quantity product-cart-quantity-${
      authDatabaseToCart.cart[i].id
    }" value="${Number(authDatabaseToCart.cart[i].quantity)}">
            </div>
          </td>
          <td>$${authDatabaseToCart.cart[i].price.toLocaleString()}</td>
          <td>$${(
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

// Function Tăng, giảm số lượng sản phẩm trong giỏ hàng
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

// Function xóa sản phẩm khỏi giỏ hàng
function handleRemoveFromCart(productId) {
  // Tìm sản phẩm trong giỏ hàng dựa trên productId
  const productIndex = authDatabaseToCart.cart.findIndex(
    (product) => product.id === productId
  );

  // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng hay không
  if (productIndex !== -1) {
    // Xóa sản phẩm khỏi giỏ hàng
    authDatabaseToCart.cart.splice(productIndex, 1);
    console.log(authDatabaseToCart);
    const item = accountsDatabase.find((el) => el.id === authDatabaseToCart.id);
    item.cart = authDatabaseToCart.cart;
    item.quantity = 0;
    console.log(item);
    console.log(accountsDatabase);

    // Cập nhật lại dữ liệu lên local storage
    localStorage.setItem("auth", JSON.stringify(authDatabaseToCart));
    localStorage.setItem("accountsDatabase", JSON.stringify(accountsDatabase));

    // Cập nhật giao diện
    renderMyCart(); // Hàm renderCart() làm nhiệm vụ cập nhật lại giao diện giỏ hàng sau khi xóa sản phẩm
    const toastLiveExample = document.getElementById(
      "liveToastOrderAlertRemoveProduct"
    );
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
  }
}

// Function đặt hàng
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

  let inputPhone = document.querySelector("#input-phone").value;
  let inputAddress = document.querySelector("#input-address").value;

  const maxId = Math.max(...ordersDatabase.map((item) => item.id));

  let newOrder = {
    id: maxId + 1,
    user_id: authDatabaseToCart.id,
    name: authDatabaseToCart.fullName,
    email: authDatabaseToCart.email,
    phone: inputPhone,
    date: date,
    status: "Pending",
    address: inputAddress,
    cart: newCart,
  };

  console.log("NewOrder", newOrder);

  if (authDatabaseToCart.cart.length === 0) {
    const toastLiveExample = document.getElementById(
      "liveToastOrderAlertEmptyCart"
    );
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    return;
  }
  if (inputPhone === "" || inputAddress === "") {
    const toastLiveExample = document.getElementById(
      "liveToastOrderAlertEmptyInfo"
    );
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    return;
  } else {
    // Check the phone number format
    const phoneNumberPattern = /^0\d{9}$/;
    if (!phoneNumberPattern.test(inputPhone)) {
      const toastLiveExample = document.getElementById(
        "liveToastOrderAlertInvalidPhoneNumber"
      );
      bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
      return;
    }

    let checkQuantity = !productsDatabaseToCart.some((item) => {
      return authDatabaseToCart.cart.some((cartItem) => {
        return (
          item.id === cartItem.id && cartItem.quantity > item.quantity_stock
        );
      });
    });
    if (!checkQuantity) {
      const toastLiveExample = document.getElementById(
        "liveToastOrderAlertOrder"
      );
      bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    } else {
      productsDatabaseToCart.map((item) => {
        authDatabaseToCart.cart.forEach((cartItem) => {
          if (item.id == cartItem.id) {
            item.quantity_stock -= cartItem.quantity;
          }
        });
      });

      ordersDatabase.push(newOrder);
      // Order Complete Notify
      const toastLiveExample = document.getElementById(
        "liveToastOrderComplete"
      );
      bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();

      // Push Cart vào trong Order History và xóa quantity_stock
      authDatabaseToCart.order_history.push(...authDatabaseToCart.cart);
      authDatabaseToCart.order_history.map(
        (item) => delete item.quantity_stock
      );

      // Trả về Cart rỗng sau khi Order
      authDatabaseToCart.cart = [];

      // Push cart và order history vào Accounts Database
      accountsDatabase.map((item) => {
        if (item.id == authDatabaseToCart.id) {
          item.order_history = authDatabaseToCart.order_history;
          item.cart = authDatabaseToCart.cart;
        }
      });
      console.log(authDatabaseToCart);
      localStorage.setItem("auth", JSON.stringify(authDatabaseToCart));
      localStorage.setItem(
        "productsDatabase",
        JSON.stringify(productsDatabaseToCart)
      );
      localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));
      localStorage.setItem(
        "accountsDatabase",
        JSON.stringify(accountsDatabase)
      );
    }
  }

  renderMyCart();
  renderOrderHistory();
  setTimeout(function () {
    window.location.reload();
  }, 600);
}

// Function chỉnh sửa thông tin User
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

// Function cập nhật thông tin User đã chỉnh sửa
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
  localStorage.setItem(
    "productsDatabase",
    JSON.stringify(productsDatabaseToCart)
  );
  localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));

  renderMyCart();
}

// Function Render Order History
function renderOrderHistory() {
  // Cách 1:
  //   const ordersDatabase = JSON.parse(localStorage.getItem("ordersDatabase"));
  //   let tableOrderHistory = document.querySelector("#table-order-history");
  //   let tableOrderHistoryContent = "";
  //   let filterOrderHistory = ordersDatabase.filter((order) => {
  //     if (authDatabaseToCart.id === order.user_id) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   const orderHistoryUser = filterOrderHistory.reduce((result, item) => {
  //     let data = item;
  //     let newData = item.cart.map((i) => {
  //       return { ...i, date: data.date, status: data.status };
  //     });
  //     return [...result, ...newData];
  //   }, []);
  //   orderHistoryUser.forEach((item, index) => {
  //     tableOrderHistoryContent += `<tr>
  //     <th>${index + 1}</th>
  //     <td><img src="${item.productImage}" alt=""></td>
  //     <td>${item.productName}</td>
  //     <td>
  //         <span class="product-cart-quantity">${item.productQuantity}</span>
  //     </td>
  //     <td>$${item.productPrice}</td>
  //     <td>$${(
  //       Number(item.productQuantity) * Number(item.productPrice)
  //     ).toLocaleString()}</td>
  //     <td>${item.date}</td>
  //     <td><span class="shipping-status-color">${item.status}</span></td>
  //     <td><span class="request-cancel-color" onclick="handleRequestCancelOrder()">${
  //       item.status === "Pending" ? "Request Cancel" : ""
  //     }</span></td>
  // </tr>`;
  //   });
  //   localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));
  //   tableOrderHistory.innerHTML = tableOrderHistoryContent;

  // Cách 2:
  const orderDatabase = JSON.parse(localStorage.getItem("ordersDatabase"));
  let tableOrderHistory = document.querySelector("#table-order-history");
  let tableOrderHistoryContent = "";
  filterOrderHistory = orderDatabase.filter((order) => {
    return order.user_id === authDatabaseToCart.id;
  });

  filterOrderHistory.forEach((order, index) => {
    let orderTotal = 0;
    filterOrderHistory[index].cart.forEach((item) => {
      orderTotal += Number(item.productQuantity) * Number(item.productPrice);
    });

    tableOrderHistoryContent += `<tr>
    <th>${index + 1}</th>
    <td>${order.id}</td>
    <td>${order.date}</td>
    <td>$${orderTotal.toLocaleString()}</td>
    <td><span class="shipping-status-color">${order.status}</span></td>
    <td>
        <button data-bs-toggle="modal" data-bs-target="#detail-order-user" class="detail-order-color" onclick="handleDetailOrderUser(${
          order.id
        })">Detail</button>
    </td>
    <td><button data-bs-toggle="modal" data-bs-target="#request-cancel-user" style = "${
      order.status === "Pending" ? "display:inline-block" : "display:none"
    }" class="request-cancel-color request-cancel-color-${
      order.id
    }" onclick="handleRequestCancelOrder(${order.id})">${
      order.request_cancel && order.status === "Cancel"
        ? "Resolved"
        : order.request_cancel
        ? "Waiting for admin's verification"
        : "Request Cancel"
    }</button></td>
</tr>`;
  });
  tableOrderHistory.innerHTML = tableOrderHistoryContent;
}
renderOrderHistory();

const shippingStatusElements = document.querySelectorAll(
  ".shipping-status-color"
);
shippingStatusElements.forEach((element) => {
  if (element.innerHTML === "Shipped") {
    element.classList.add("shipping-label-shipped");
  } else if (element.innerHTML === "Pending") {
    element.classList.add("shipping-label-pending");
  } else if (element.innerHTML === "Cancel") {
    element.classList.add("shipping-label-cancel");
  } else if (element.innerHTML === "Processing") {
    element.classList.add("shipping-label-processing");
  }
});

// Function Detail Order
let summaryInfoElementContent = "";
function handleDetailOrderUser(id) {
  let orderDetailElementContent = "";
  const orderIndex = ordersDatabase.findIndex((order) => {
    return order.id === id;
  });

  console.log(orderIndex);
  let summaryInfoElement = document.querySelector("#summary-info-detail");
  let statusOptions = "";

  if (ordersDatabase[orderIndex].status === "Processing") {
    statusOptions = `
      <option value="Processing" selected>Processing</option>
      <option value="Cancel">Cancel</option>
      <option value="Shipped">Shipped</option>
      <option value="Pending">Pending</option>

    `;
  } else if (ordersDatabase[orderIndex].status === "Cancel") {
    statusOptions = `
      <option value="Processing">Processing</option>
      <option value="Cancel" selected>Cancel</option>
      <option value="Shipped">Shipped</option>
      <option value="Pending" >Pending</option>

    `;
  } else if (ordersDatabase[orderIndex].status === "Shipped") {
    statusOptions = `
      <option value="Processing">Processing</option>
      <option value="Cancel">Cancel</option>
      <option value="Shipped" selected>Shipped</option>
      <option value="Pending" >Pending</option>

    `;
  } else if (ordersDatabase[orderIndex].status === "Pending") {
    statusOptions = `
      <option value="Processing">Processing</option>
      <option value="Cancel">Cancel</option>
      <option value="Shipped" selected>Shipped</option>
      <option value="Pending" selected>Pending</option>
    `;
  }

  summaryInfoElementContent = `<div class="summary-order">
      <h2 class="cart-title">Summary</h2>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Email</h4>
        <input type="text" placeholder="${ordersDatabase[orderIndex].email}" disabled>
      </div>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Phone</h4>
        <input type="text" placeholder="${ordersDatabase[orderIndex].phone}" disabled>
      </div>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Address</h4>
        <input type="text" placeholder="${ordersDatabase[orderIndex].address}" disabled>
      </div>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Status</h4>
        <select name="shipping-status" id="shipping-status" disabled>
          ${statusOptions}
        </select>
      </div>
    </div>`;

  let orderDetailElement = document.querySelector("#order-cart-detail");

  let totalOrder = 0;
  ordersDatabase[orderIndex].cart.forEach((item, index) => {
    orderDetailElementContent += `
        <tr>
          <td>${index + 1}</td>
          <td><img src="${item.productImage}" alt=""></td>
          <td>${item.productName}</td>
          <td>
            <span class="product-cart-quantity">${Number(
              item.productQuantity
            )}</span>
          </td>
          <td>$${Number(item.productPrice)}</td>
          <td>$${(
            item.productQuantity * item.productPrice
          ).toLocaleString()}</td>
        </tr>
      `;

    totalOrder += Number(item.productQuantity) * Number(item.productPrice);
  });

  //   orderDatabase[orderIndex].cart.forEach((item, index) => {
  //   });
  //   console.log(totalOrder);

  orderDetailElement = `
  <div class="table-responsive">
      <table class="table table-cart">
      <thead>
                                <tr>
                                    <th scope="col" style="min-width: 20px;">#</th>
                                    <th scope="col" style="min-width: 50px;">Product Image</th>
                                    <th scope="col" style="min-width: 100px;">Product Name</th>
                                    <th scope="col" style="min-width: 50px;">Quantity</th>
                                    <th scope="col" style="min-width: 100px;">Price</th>
                                    <th scope="col" style="min-width: 100px;">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            ${orderDetailElementContent}
                            </tbody>
      
      </table>
      </div> 
      <div class="card-total">
                            <span class="cart-quantity-item">Item: ${
                              ordersDatabase[orderIndex].cart.length
                            }</span>
                            <span class="cart-total-quantity">Total: $ ${totalOrder.toLocaleString()}</span>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          
                          </div>`;

  summaryInfoElement.innerHTML = summaryInfoElementContent + orderDetailElement;
}

// Function Request Cancel Order
function handleRequestCancelOrder(id) {
  let cancelOrderReasonValue = document.querySelector(
    "#reason-cancel-order"
  ).value;
  let cancelOrderReason = "";
  cancelOrderReason = `
  <option value="" disabled selected>---Reason---</option>
  <option value="Ordered the wrong product">1. Ordered the wrong product</option>
  <option value="Duplicate order">2. Duplicate order</option>
  <option value="I don't want to buy anymore">3. I don't want to buy anymore</option>
  <option value="Delivery time too long">4. Delivery time too long</option>
  <option value="Another reason...">5. Another reason...</option>
  `;
  let summaryCancelOrder = document.querySelector("#summary-cancel-detail");
  let summaryCancelOrderContent = "";
  summaryCancelOrderContent += `<div class="summary-cancel-order">
  <h2 class="cart-title">Request Cancel Order Form</h2>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Order ID</h4>
      <input type="text" placeholder="${id}" style="width: 24%;" disabled>
  </div>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Reason</h4>
      <select name="shipping-status" id="reason-cancel-order">
          ${cancelOrderReason}
      </select>
  </div>

  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="handleSaveCancelOrder(${id})">Send Request Cancel</button>
    </div>
</div>`;

  summaryCancelOrder.innerHTML = summaryCancelOrderContent;
}

// Function Save Cancel Order
function handleSaveCancelOrder(id) {
  let cancelOrderReason = document.querySelector("#reason-cancel-order").value;
  let requestCancelBtn = document.querySelector(`.request-cancel-color-${id}`);
  const orderID = ordersDatabase.find((order) => {
    return order.id == id;
  });

  if (cancelOrderReason == "") {
    const toastLiveExample = document.getElementById("liveToastCancelRequest");
    bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    return;
  } else {
    orderID.request_cancel = cancelOrderReason;
    localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));
    requestCancelBtn.innerHTML = "Waiting for Admin's Verification";
    requestCancelBtn.disabled = true;
  }
  console.log(ordersDatabase);
}
