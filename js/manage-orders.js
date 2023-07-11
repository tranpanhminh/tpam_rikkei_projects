const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
const orderDatabase = JSON.parse(localStorage.getItem("orderDatabase"));
// Function Render Order
function renderOrder(orderDatabase) {
  console.log(orderDatabase);
  let tableOrderElement = document.querySelector("#table-order-list");
  let revenueElement = document.querySelector(".revenue-text");
  let total = 0;
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
  for (let i = 0; i < orderDatabase.length; i++) {
    tableOrderContent += `<tr>
    <td>${orderDatabase[i].id}</td>
    <td>${orderDatabase[i].name}</td>
    <td>${orderDatabase[i].email}</td>
    <td>${orderDatabase[i].phone}</td>
    <td>${orderDatabase[i].date}</td>
    <td>${orderDatabase[i].status}</td>
    <td>${orderDatabase[i].total}</td>
    <td><button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleDetailOrder(${orderDatabase[i].id}})"
            class="detail-order-btn">Detail</button>
        <button onclick="handleDeleteOrder(${orderDatabase[i].id})" class="delete-order-btn">Delete</button>
    </td>
</tr>`;
    let itemTotal = Number(orderDatabase[i].total);
    total += itemTotal;
  }
  tableOrderElement.innerHTML = tableOrderContent;
  revenueElement.innerHTML = `$ ${total.toLocaleString()}`;
}
renderOrder(orderDatabase);

function handleDetailOrder(id) {
  console.log(id);
  let totalDetail = 0;
  let summaryInfoElement = document.querySelector("#summary-info-detail");
  let summaryInfoElementContent = "";
  let orderDetailElement = document.querySelector("#order-detail");
  let orderDetailElementContent = "";

  if (orderDatabase[id] && id) {
    summaryInfoElementContent = `<div class="summary-order">
        <h2 class="cart-title">Summary</h2>
        <div class="cart-shipping">
            <h4 class="cart-shipping-title">Email</h4>
            <input type="text" placeholder="${orderDatabase[j].id.email}" disabled>
        </div>
        <div class="cart-shipping">
            <h4 class="cart-shipping-title">Phone</h4>
            <input type="text" placeholder="${orderDatabase[j].id.phone}" disabled>
        </div>
        <div class="cart-shipping">
            <h4 class="cart-shipping-title">Address</h4>
            <input type="text" placeholder="${orderDatabase[j].id.address}" disabled>
        </div>
      </div>`;

    orderDetailElementContent = `<thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Product Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
        </tr>
      </thead>`;

    for (let j = 0; j < orderDatabase[id].cart.length; j++) {
      orderDetailElementContent += `<tbody>
          <tr>
              <th>${j + 1}</th>
              <td><img src="${
                orderDatabase[id].cart[j].productImage
              }" alt=""></td>
              <td>${orderDatabase[id].cart[j].productName}</td>
              <td>
                  <span class="product-cart-quantity">${Number(
                    orderDatabase[id].cart[j].productQuantity
                  )}</span>
              </td>
              <td>$${orderDatabase[id].cart[j].productPrice}</td>
              <td>${orderDatabase[id].cart[j].productTotal}</td>
          </tr>
        </tbody>`;

      let itemTotalDetail = Number(orderDatabase[id].cart[j].productTotal);
      totalDetail += itemTotalDetail;
    }
  }

  summaryInfoElement.innerHTML = summaryInfoElementContent;
  orderDetailElement.innerHTML = orderDetailElementContent;
  console.log(orderDetailElementContent);

  let cartTotalDetail = document.querySelector(".cart-total");
  let cartTotalDetailContent = "";
  cartTotalDetailContent += `
      <span class="cart-quantity-item">Item: ${orderDatabase[id].cart.length}</span>
      <span class="cart-total-quantity">Total: $${totalDetail}</span>
    `;
  cartTotalDetail.innerHTML = cartTotalDetailContent;
}
