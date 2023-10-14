const orderItemsEntity = require("../entities/orderItems.entity.js");

// ---------------------------------------------------------
class OrderItemsRepo {
  // 1. Get All
  async getAllItemsByOrderId(orderId) {
    const listOrderItems = await orderStatusesEntity.findAll({
      where: { order_id: orderId },
    });
    return listOrderItems;
  }
}

module.exports = new OrderItemsRepo();
