const orderStatusesRepo = require("../repository/orderStatuses.repository.js");

// ---------------------------------------------------------
class OrderStatusesService {
  // 1. Get All
  async getAllOrderStatuses() {
    const listOrderStatuses = await orderStatusesRepo.getAllOrderStatuses();
    if (listOrderStatuses.length === 0) {
      return { data: "No OrderStatus Found", status: 404 };
    } else {
      return { data: listOrderStatuses, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailOrderStatus(orderStatusId) {
    const detailOrderStatus = await orderStatusesRepo.getDetailOrderStatus(
      orderStatusId
    );
    if (!detailOrderStatus) {
      return { data: "OrderStatus ID Not Found", status: 404 };
    } else {
      return { data: detailOrderStatus, status: 200 };
    }
  }

  // 3. Add
  async addOrderStatus(name) {
    if (!name) {
      return { data: "OrderStatus Name must not be blank", status: 406 };
    } else {
      const orderStatusInfo = {
        name: name,
      };
      await orderStatusesRepo.addOrderStatus(orderStatusInfo);
      return { data: "OrderStatus Added", status: 200 };
    }
  }

  // 4. Delete
  async deleteOrderStatus(orderStatusId) {
    const findOrderStatus = await orderStatusesRepo.findOrderStatusById(
      orderStatusId
    );
    if (!findOrderStatus) {
      return { data: "OrderStatus ID Not Found", status: 404 };
    } else {
      await orderStatusesRepo.deleteOrderStatus(orderStatusId);
      return { data: "OrderStatus Deleted", status: 200 };
    }
  }

  // 5. Update
  async updateOrderStatus(name, orderStatusId) {
    const findOrderStatus = await orderStatusesRepo.findOrderStatusById(
      orderStatusId
    );
    if (!findOrderStatus) {
      return { data: "OrderStatus ID Not Found", status: 404 };
    }

    const dataOrderStatus = findOrderStatus.dataValues;

    const orderStatusInfo = {
      name: !name ? dataOrderStatus.name : name,
      updated_at: Date.now(),
    };

    await orderStatusesRepo.updateOrderStatus(orderStatusInfo, orderStatusId);
    return { data: "OrderStatus Status Updated", status: 200 };
  }
}

module.exports = new OrderStatusesService();
