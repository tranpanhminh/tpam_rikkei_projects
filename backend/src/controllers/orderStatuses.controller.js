const orderStatusesService = require("../services/orderStatuses.service.js");

// ---------------------------------------------------------
class OrderStatusesController {
  // 1. Get All
  async getAllOrderStatuses(req, res) {
    const result = await orderStatusesService.getAllOrderStatuses();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail
  async getDetailOrderStatus(req, res) {
    const orderStatusId = req.params.orderStatusId;
    const result = await orderStatusesService.getDetailOrderStatus(
      orderStatusId
    );
    return res.status(result.status).json(result.data);
  }

  // 3. Add
  async addOrderStatus(req, res) {
    const { name } = req.body;
    const result = await orderStatusesService.addOrderStatus(name);
    return res.status(result.status).json(result.data);
  }

  // 4. Delete
  async deleteOrderStatus(req, res) {
    const orderStatusId = req.params.orderStatusId;
    const result = await orderStatusesService.deleteOrderStatus(orderStatusId);
    return res.status(result.status).json(result.data);
  }

  // 5. Update
  async updateOrderStatus(req, res) {
    const { name } = req.body;
    const orderStatusId = req.params.orderStatusId;
    const result = await orderStatusesService.updateOrderStatus(
      name,
      orderStatusId
    );
    return res.status(result.status).json(result.data);
  }
}

module.exports = new OrderStatusesController();
