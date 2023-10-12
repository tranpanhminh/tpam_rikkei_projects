const sequelize = require("../configs/db.config.js");
const { Op, col, fn } = require("sequelize");
const ordersEntity = require("../entities/orders.entity.js");
const cartsEntity = require("../entities/carts.entity.js");
const orderItemsEntity = require("../entities/orderItems.entity.js");
const orderStatusesEntity = require("../entities/orderStatuses.entity.js");
const cancelReasonsEntity = require("../entities/cancelReasons.entity.js");
const productsEntity = require("../entities/products.entity.js");
const usersEntity = require("../entities/users.entity.js");
const paymentsEntity = require("../entities/payments.entity.js");
const { format, parse } = require("date-fns");
const couponsEntity = require("../entities/coupons.entity.js");

const ordersService = require("../services/orders.service.js");

// ---------------------------------------------------------
class OrdersController {
  // 1. Get All Orders (For Admin)
  async getAllOrders(req, res) {
    const result = await ordersService.getAllOrders();
    res.status(result.status).json(result.data);
  }

  // 2. Get Detail Order (For Admin)
  async getDetailOrder(req, res) {
    const orderId = req.params.orderId;
    const result = await ordersService.getDetailOrder(orderId);
    res.status(result.status).json(result.data);
  }

  // 3. Get All Orders By User (For Customer)
  async getAllOrderByUser(req, res) {
    const userId = req.params.userId;
    const result = await ordersService.getAllOrders(userId);
    res.status(result.status).json(result.data);
  }

  // 4. Checkout Cart
  async checkoutOrder(req, res) {
    const dataBody = req.body;
    const userId = req.params.userId;
    const result = await ordersService.checkoutOrder(userId, dataBody);
    res.status(result.status).json(result.data);
  }

  // 5. Update Status Order For Admin
  async updatedOrder(req, res) {
    const { status_id } = req.body;
    const orderId = req.params.orderId;
    const result = await ordersService.updatedOrder(orderId, status_id);
    res.status(result.status).json(result.data);
  }

  // 6. Cancel Order For Customer
  async cancelOrder(req, res) {
    const { cancel_reason_id } = req.body;
    const orderId = req.params.orderId;
    const result = await ordersService.cancelOrder(orderId, cancel_reason_id);
    res.status(result.status).json(result.data);
  }

  // 7. GetOrder By Order ID
  async getOrder(req, res) {
    const orderId = req.params.orderId;
    const result = await ordersService.getOrder(orderId);
    res.status(result.status).json(result.data);
  }
}
module.exports = new OrdersController();
