Xóa đi button Delete đơn hàng
<button class="delete-order-button" onclick="handleDeleteOrder(${ordersDatabase[i].id})">Delete</button>

function renderOrder(ordersDatabase) {
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
      <td>Order Cancel Request</td>
    </tr>`;
for (let i = 0; i < ordersDatabase.length; i++) {
let orderTotal = 0;
ordersDatabase[i].cart.forEach((item) => {
orderTotal += Number(item.productQuantity) \* Number(item.productPrice);
});

    if (ordersDatabase[i].status === "Shipped") {
      totalOrderSummary += orderTotal;
    }

    tableOrderContent += `<tr>
        <td>${ordersDatabase[i].id}</td>
        <td>${ordersDatabase[i].name}</td>
        <td>${ordersDatabase[i].email}</td>
        <td>${ordersDatabase[i].phone}</td>
        <td>${ordersDatabase[i].date}</td>
        <td><span class="shipping-status-color">${
          ordersDatabase[i].status
        }</span></td>
        <td>$${orderTotal}</td>
        <td>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="handleDetailOrder(${
            ordersDatabase[i].id
          })" class="detail-order-btn">Detail</button>
          <button class="delete-order-button" onclick="handleDeleteOrder(${ordersDatabase[i].id})">Delete</button>
        </td>
      <td><span class="cancel-reason-${
        ordersDatabase[i].id
      }" title="Cancel Reason: ${ordersDatabase[i].request_cancel}">${
      ordersDatabase[i].request_cancel && ordersDatabase[i].status === "Cancel"
        ? "Resolved"
        : ordersDatabase[i].request_cancel !== undefined
        ? `User Request Cancel`
        : ""
    }</span></td>
      </tr>`;

}
tableOrderElement.innerHTML = tableOrderContent;
revenueElement.innerHTML = `Revenue: $${totalOrderSummary.toLocaleString()}`;
}

renderOrder(ordersDatabase);
