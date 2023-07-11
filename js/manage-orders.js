const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
const ordersDatabase = JSON.parse(localStorage.getItem("ordersDatabase"));

// Function Render Order
function renderOrder(ordersDatabase) {
  console.log(ordersDatabase);
  let tableOrderElement = document.querySelector("#table-order-list");
  let revenueElement = document.querySelector(".revenue-text");
  let totalOrderSummary = 0;
  let tableOrderContent = "";
  tableOrderContent = `<tr>
      <td>Order ID</td>
      <td>Name</td>
      <td>Email</td>
      <td>Phone</td>
      <td>Date</td>
      <td>Status</td>
      <td>Total</td>
      <td>Action</td>
    </tr>`;
  for (let i = 0; i < ordersDatabase.length; i++) {
    let orderTotal = 0;
    ordersDatabase[i].cart.forEach((item) => {
      orderTotal += Number(item.productQuantity) * Number(item.productPrice);
    });
    totalOrderSummary += orderTotal;

    tableOrderContent += `<tr>
        <td>${ordersDatabase[i].id}</td>
        <td>${ordersDatabase[i].name}</td>
        <td>${ordersDatabase[i].email}</td>
        <td>${ordersDatabase[i].phone}</td>
        <td>${ordersDatabase[i].date}</td>
        <td>${ordersDatabase[i].status}</td>
        <td>$${orderTotal}</td>
        <td>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleDetailOrder(${i})" class="detail-order-btn">Detail</button>
          <button onclick="handleDeleteOrder(${i})" class="delete-order-btn">Delete</button>
        </td>
      </tr>`;
  }
  tableOrderElement.innerHTML = tableOrderContent;
  revenueElement.innerHTML = `$ ${totalOrderSummary.toLocaleString()}`;
}

renderOrder(ordersDatabase);

// Function handleDetailOrder
let summaryInfoElementContent = "";
function handleDetailOrder(id) {
  let orderDetailElementContent = "";
  console.log(id);
  let summaryInfoElement = document.querySelector("#summary-info-detail");
  summaryInfoElementContent = `<div class="summary-order">
      <h2 class="cart-title">Summary</h2>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Email</h4>
        <input type="text" placeholder="${ordersDatabase[id].email}" disabled>
      </div>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Phone</h4>
        <input type="text" placeholder="${ordersDatabase[id].phone}" disabled>
      </div>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Address</h4>
        <input type="text" placeholder="${ordersDatabase[id].address}" disabled>
      </div>
    </div>`;

  let orderDetailElement = document.querySelector("#order-cart-detail");

  let totalOrder = 0;
  ordersDatabase[id].cart.forEach((item, index) => {
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

  //   orderDatabase[id].cart.forEach((item, index) => {
  //   });
  //   console.log(totalOrder);

  orderDetailElement = `
      <table class="table table-cart">
      <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Image</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            ${orderDetailElementContent}
                            </tbody>
      
      </table>
      <div class="card-total">
                            <span class="cart-quantity-item">Item: ${
                              ordersDatabase[id].cart.length
                            }</span>
                            <span class="cart-total-quantity">Total: $ ${totalOrder.toLocaleString()}</span>
                        </div>
    `;

  summaryInfoElement.innerHTML = summaryInfoElementContent + orderDetailElement;
}

// Function Search Product
function handleSearctOrder() {
  let searchResult = document.querySelector(".search-result");
  let inputSearch = document.querySelector("#search-bar").value.toLowerCase();
  console.log(inputSearch);
  let filterOrder = ordersDatabase.filter(function (order) {
    if (
      order.id.toString().toLowerCase() === inputSearch ||
      order.name.toLowerCase().includes(inputSearch) ||
      order.email.toLowerCase().includes(inputSearch) ||
      order.phone.toString().toLowerCase() === inputSearch ||
      order.status.toLowerCase().includes(inputSearch)
    ) {
      return true;
    }
    return false;
  });
  console.log(filterOrder);
  searchResult.innerHTML = `${filterOrder.length} results`;
  searchResult.style.display = "block";
  renderOrder(filterOrder);
}
