const productDetail = JSON.parse(localStorage.getItem("productDetail"));
const accountsDatabase = JSON.parse(localStorage.getItem("accountsDatabase"));
// Function Render My Cart
function renderMyCart() {
  let tableMyCartElement = document.querySelector("#table-my-cart");
  let myCartSummary = document.querySelector("#my-cart-summary");
  let myCartSummaryContent = "";
  let tableMyCartElementContent = "";
  for (let i = 0; i < authDatabase.cart.length; i++) {
    tableMyCartElementContent += `
        <tr>
          <th>${i + 1}</th>
          <td><img src="${authDatabase.cart[i].productImage[0]}" alt=""></td>
          <td>${authDatabase.cart[i].name}</td>
          <td>
            <div class="td-flex">
              <i class="fa-solid fa-minus minus-product-icon" onclick="handleMinus(${i})"></i>
              <span class="product-cart-quantity">${Number(
                authDatabase.cart[i].quantity
              )}</span>
              <i class="fa-solid fa-plus plus-product-icon" onclick="handlePlus(${i})"></i>
            </div>
          </td>
          <td>$ ${authDatabase.cart[i].price.toLocaleString()}</td>
          <td>$ ${(
            Number(authDatabase.cart[i].quantity) *
            Number(authDatabase.cart[i].price)
          ).toLocaleString()}</td>
          <td><i class="fa-solid fa-xmark delete-product-icon"></i></td>
        </tr>`;
  }

  myCartSummaryContent = `<h2 class="cart-title">Summary</h2>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Email</h4>
      <input type="text" placeholder="">
  </div>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Phone</h4>
      <input type="text" placeholder="">
  </div>

  <div class="cart-shipping">
      <h4 class="cart-shipping-title">Shipping</h4>
      <input type="text" placeholder="">
  </div>

  <div class="card-total">
      <span class="cart-quantity-item">Item: ${authDatabase.cart.length}</span>
      <span class="cart-total-quantity">Total: 5000</span>
  </div>

  <button type="button" class="btn btn-primary order-btn" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      ORDER
  </button>`;
  tableMyCartElement.innerHTML = tableMyCartElementContent;
  myCartSummary.innerHTML = myCartSummaryContent;
}

if (authDatabase) {
  renderMyCart();
}

// Cộng và giảm số lượng
function handlePlus() {
  let productQuantity = document.querySelector(".product-cart-quantity");
  console.log(productQuantity);
  productQuantity += 1;
}
