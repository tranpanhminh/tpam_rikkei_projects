const connectMySQL = require("../configs/db.config.js");
const ordersEntity = require("../entities/orders.entity.js");
const orderItemsEntity = require("../entities/orderItems.entity.js");
const productsEntity = require("../entities/products.entity.js");
const usersEntity = require("../entities/users.entity.js");
const bcrypt = require("bcryptjs");

const orderItemsService = require("../services/orderItems.service.js");

// ---------------------------------------------------------
class OrderItemsController {
  async getAllItemsByOrderId() {
    const orderId = req.params.orderId;
    const result = await orderItemsService.getAllItemsByOrderId(orderId);
    return res.status(result.status).json(result.data);
  }
}
module.exports = new OrderItemsController();
