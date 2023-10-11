const orderStatusesEntity = require("../entities/orderStatuses.entity.js");

// ---------------------------------------------------------
class OrderStatusesRepo {
  async findOrderStatusById(orderStatusId) {
    const findOrderStatus = await orderStatusesEntity.findOne({
      where: { id: orderStatusId },
    });
    return findOrderStatus;
  }

  // 1. Get All
  async getAllOrderStatuses() {
    const listOrderStatuses = await orderStatusesEntity.findAll();
    return listOrderStatuses;
  }

  // // 2. Get Detail
  async getDetailOrderStatus(orderStatusId) {
    const findOrderStatus = await orderStatusesEntity.findOne({
      where: { id: orderStatusId },
    });
    return findOrderStatus;
  }

  // 3. Add
  async addOrderStatus(orderStatusInfo) {
    const newOrderStatus = await orderStatusesEntity.create(orderStatusInfo);
    return newOrderStatus;
  }

  // 4. Delete
  async deleteOrderStatus(orderStatusId) {
    const deleteOrderStatus = await orderStatusesEntity.destroy({
      where: { id: orderStatusId },
    });
    return deleteOrderStatus;
  }

  // 5. Update
  async updateOrderStatus(orderStatusInfo, orderStatusId) {
    const updateOrderStatus = await orderStatusesEntity.update(orderStatusInfo, {
      where: { id: orderStatusId },
    });
    return updateOrderStatus;
  }
}

module.exports = new OrderStatusesRepo();
