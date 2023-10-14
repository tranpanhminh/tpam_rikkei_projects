const orderItemsRepo = require("../repository/orderItems.repository.js");

// ---------------------------------------------------------
class OrderItemsService {
  // 1. Get All
  async getAllItemsByOrderId(orderId) {
    const listOrderItems = await orderItemsRepo.getAllItemsByOrderId(orderId);
    if (listOrderItems.length === 0) {
      return { data: [], status: 200 };
    } else {
      return { data: listOrderItems, status: 200 };
    }
  }
}

module.exports = new OrderItemsService();
