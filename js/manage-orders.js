const productsDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
const ordersDatabase = JSON.parse(localStorage.getItem("ordersDatabase"));
const authDatabaseManageOrdersPage = JSON.parse(localStorage.getItem("auth"));

if (
  (window.location.href.includes(
    "http://127.0.0.1:5501/admin/manage-orders.html"
  ) &&
    !authDatabaseManageOrdersPage) ||
  authDatabaseManageOrdersPage.role !== "admin" ||
  (authDatabaseManageOrdersPage.role === "admin" &&
    authDatabaseManageOrdersPage.status === "Inactive")
) {
  window.location.href = "/index.html";
}

let userTitle = document.querySelector(".user-title");
userTitle.innerHTML = authDatabaseManageOrdersPage.fullName;

// Function Render Order
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
      orderTotal += Number(item.productQuantity) * Number(item.productPrice);
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

// Đổi màu shipping label
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
  } else if (element.innerHTML === "Shipping") {
    element.classList.add("shipping-label-shipping");
  }
});

// Function xem chi tiết đơn hàng
let summaryInfoElementContent = "";
function handleDetailOrder(id) {
  let orderDetailElementContent = "";
  const orderIndex = ordersDatabase.findIndex((order) => {
    return order.id === id;
  });

  let summaryInfoElement = document.querySelector("#summary-info-detail");
  let statusOptions = "";

  if (ordersDatabase[orderIndex].status === "Processing") {
    statusOptions = `
    <option value="Processing" selected>Processing</option>
    <option value="Cancel">Cancel</option>
    <option value="Shipped">Shipped</option>
    <option value="Pending">Pending</option>
    <option value="Shipping">Shipping</option>
    `;
  } else if (ordersDatabase[orderIndex].status === "Cancel") {
    statusOptions = `
    <option value="Processing">Processing</option>
    <option value="Cancel" selected>Cancel</option>
    <option value="Shipped">Shipped</option>
    <option value="Pending">Pending</option>
    <option value="Shipping">Shipping</option>
    `;
  } else if (ordersDatabase[orderIndex].status === "Shipped") {
    statusOptions = `
    <option value="Processing">Processing</option>
    <option value="Cancel">Cancel</option>
    <option value="Shipped" selected>Shipped</option>
    <option value="Pending">Pending</option>
    <option value="Shipping">Shipping</option>
    `;
  } else if (ordersDatabase[orderIndex].status === "Pending") {
    statusOptions = `
    <option value="Processing">Processing</option>
    <option value="Cancel">Cancel</option>
    <option value="Shipped">Shipped</option>
    <option value="Pending" selected>Pending</option>
    <option value="Shipping">Shipping</option>
    `;
  } else if (ordersDatabase[orderIndex].status === "Shipping") {
    statusOptions = `
      <option value="Processing">Processing</option>
      <option value="Cancel">Cancel</option>
      <option value="Shipped">Shipped</option>
      <option value="Pending">Pending</option>
      <option value="Shipping" selected>Shipping</option>
    `;
  }

  summaryInfoElementContent = `<div class="summary-order">
      <h2 class="cart-title">Summary</h2>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Name</h4>
        <input type="text" placeholder="${
          ordersDatabase[orderIndex].name
        }" disabled>
      </div>

      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Email</h4>
        <input type="text" placeholder="${
          ordersDatabase[orderIndex].email
        }" disabled>
      </div>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Phone</h4>
        <input type="text" placeholder="${
          ordersDatabase[orderIndex].phone
        }" disabled>
      </div>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Address</h4>
        <input type="text" placeholder="${
          ordersDatabase[orderIndex].address
        }" disabled>
      </div>
  
      <div class="cart-shipping">
        <h4 class="cart-shipping-title">Status</h4>
        <select name="shipping-status" id="shipping-status" ${
          (ordersDatabase[orderIndex].status === "Cancel" &&
            ordersDatabase[orderIndex].request_cancel) ||
          ordersDatabase[orderIndex].status === "Shipped" ||
          ordersDatabase[orderIndex].status === "Cancel"
            ? "disabled"
            : ""
        }>
          ${
            ordersDatabase[orderIndex].request_cancel
              ? `<option value="Cancel">Cancel</option>`
              : statusOptions
          }
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
                              ordersDatabase[orderIndex].cart.length
                            }</span>
                            <span class="cart-total-quantity">Total: $ ${totalOrder.toLocaleString()}</span>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="handleSaveChange(${
                          ordersDatabase[orderIndex].id
                        })" data-id="${
    ordersDatabase[orderIndex].id
  }">Save changes</button>
                    </div> `;

  summaryInfoElement.innerHTML = summaryInfoElementContent + orderDetailElement;
}

// Function tìm kiếm Order
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

// function thay đổi trạng thái đơn hàng
// function handleSwitchShippingStatus(id) {
//   let switchStatus = ["Processing", "Shipped", "Cancel"];

//   for (let i = 0; i < switchStatus.length; i++) {}
// }

// Function cập nhật trạng thái đơn hàng
function handleSaveChange(orderId) {
  const accountsDatabase = JSON.parse(localStorage.getItem("accountsDatabase"));

  let shippingStatus = document.querySelector("#shipping-status").value;
  const orderIndex = ordersDatabase.findIndex((order) => order.id === orderId);

  if (orderIndex !== -1) {
    ordersDatabase[orderIndex].status = shippingStatus;
  }

  accountsDatabase.forEach((account) => {
    account.order_history.forEach((order) => {
      if (orderId === order.id) {
        order.status = shippingStatus;
      }
    });
  });

  // Trả lại số lượng hàng đã Cancel đơn vào Stock
  if (ordersDatabase[orderIndex].status === "Cancel") {
    ordersDatabase[orderIndex].cart.forEach((item) => {
      productsDatabase.forEach((product) => {
        if (item.productID === product.id) {
          product.quantity_stock += item.productQuantity;
          localStorage.setItem(
            "productsDatabase",
            JSON.stringify(productsDatabase)
          );
        }
      });
    });
  }

  localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));
  localStorage.setItem("accountsDatabase", JSON.stringify(accountsDatabase));
  renderOrder(ordersDatabase);

  // Hiển thị thông báo cập nhật trạng thái đơn hàng thành công
  const toastLiveExample = document.getElementById("liveToastSaveOrderNotify");
  bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();

  // Hiển thị dòng chữ Resolved - Đã xử lý Cancel đơn cho khách yêu cầu hủy hàng
  let cancelReason = document.querySelector(
    `.cancel-reason-${ordersDatabase[orderIndex].id}`
  );

  if (
    ordersDatabase[orderIndex].status === "Cancel" &&
    ordersDatabase[orderIndex].request_cancel !== ""
  ) {
    cancelReason.innerHTML = "Resolved";
    shippingStatus.disabled = true;
  }

  setTimeout(function () {
    window.location.reload();
  }, 500);
}

// Function xoá Order khỏi cửa hàng // Tắt chức năng xóa Order đơn hàng
// function handleDeleteOrder(id) {
//   const accountsDatabase = JSON.parse(localStorage.getItem("accountsDatabase"));

//   const orderIndex = ordersDatabase.findIndex((order) => order.id === id);
//   ordersDatabase.splice(orderIndex, 1);

//   accountsDatabase.forEach((account) => {
//     account.order_history.forEach((order, index) => {
//       if (id === order.id) {
//         account.order_history.splice(index, 1);
//       }
//     });
//   });

//   localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));
//   localStorage.setItem("accountsDatabase", JSON.stringify(accountsDatabase));
//   renderOrder(ordersDatabase);

//   const toastLiveExample = document.getElementById(
//     "liveToastDeleteOrderNotify"
//   );
//   bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();

//   setTimeout(function () {
//     window.location.reload();
//   }, 800);
// }

// Function Render Monthly Revenue
function showMonthlyRevenue() {
  let modalMonthlyRevenue = document.querySelector(".modalMonthlyRevenue");
  let modalMonthlyRevenueContent = "";
  modalMonthlyRevenue.innerHTML = modalMonthlyRevenueContent;
  // Tạo một đối tượng để lưu trữ doanh thu theo từng tháng
  const revenueByMonth = {};

  // Tạo một mảng chứa tất cả các tháng trong năm
  const allMonths = [];
  for (let month = 1; month <= 12; month++) {
    allMonths.push(month);
  }

  // Duyệt qua mảng allMonths để tính tổng doanh thu theo từng tháng
  allMonths.forEach((month) => {
    revenueByMonth[month] = 0; // Khởi tạo giá trị 0 cho mỗi tháng
  });

  // Duyệt qua các đơn hàng để tính tổng doanh thu theo từng tháng
  ordersDatabase.forEach((order) => {
    const dateParts = order.date.split("/");
    const month = parseInt(dateParts[0]);

    const totalOrderRevenue = order.cart.reduce((acc, cartItem) => {
      if (order.status === "Shipped") {
        return acc + cartItem.productQuantity * cartItem.productPrice;
      } else {
        return 0;
      }
    }, 0);

    revenueByMonth[month] += totalOrderRevenue;
  });

  // Hiển thị kết quả vào modalMonthlyRevenueContent
  allMonths.forEach((month) => {
    const revenue = revenueByMonth[month];
    const displayMonthYear = `${month
      .toString()
      .padStart(2, "0")}/${new Date().getFullYear()}`;
    const displayRevenue = revenue !== 0 ? `$${revenue}` : "0"; // Xử lý hiển thị nếu không có doanh thu
    modalMonthlyRevenueContent += `<tr>
      <td>${displayMonthYear}</td>
      <td>${displayRevenue}</td>
    </tr>`;
  });

  modalMonthlyRevenue.innerHTML = modalMonthlyRevenueContent;
}
