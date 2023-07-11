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
  console.log("Tổng là: ", total);
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

 // Kiểm tra xem Auth và Accounts Database có giống nhau không
  // accountsDatabase.map((item) => {
  //   if (item.id == authDatabase.id) {
  //     item.cart = cart;
  //   }
  // });

  // authDatabase.cart = cart;

  localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));
  renderMyCart();
}
