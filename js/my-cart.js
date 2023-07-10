const productDetail = JSON.parse(localStorage.getItem("productDetail"));
const accountsDatabase = JSON.parse(localStorage.getItem("accountsDatabase"));
const authDatabaseToCart = JSON.parse(localStorage.getItem("auth"));

console.log(authDatabaseToCart);
console.log(authDatabaseToCart.cart[0].quantity);
// Function Render My Cart
function renderMyCart() {
  let tableMyCartElement = document.querySelector("#table-my-cart");
  let myCartSummary = document.querySelector("#my-cart-summary");
  let myCartSummaryContent = "";
  let tableMyCartElementContent = "";
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
              <span class="product-cart-quantity">${Number(
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
  }

  myCartSummaryContent = `<h2 class="cart-title">Summary</h2>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Phone</h4>
      <input type="text" placeholder="" id="input-phone">
  </div>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Address</h4>
      <input type="text" placeholder="" id="input-address">
  </div>

  <div class="card-total">
      <span class="cart-quantity-item">Item: ${authDatabaseToCart.cart.length}</span>
      <span class="cart-total-quantity">Total: 5000</span>
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
function handlePlus() {
  let productQuantity = document.querySelector(".product-cart-quantity");
  console.log(productQuantity);
  productQuantity += 1;
}

// Function Order
let order = [];
function handleOrder() {
  let inputPhone = document.querySelector("#input-phone").value;
  let inputAddress = document.querySelector("#input-address").value;
}
