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

const ordersRepo = require("../repository/orders.repository.js");
// ---------------------------------------------------------
class OrdersService {
  // 1. Get All Orders
  async getAllOrders() {
    // const listOrders = await ordersEntity.findAll();
    const listOrders = await ordersRepo.getAllOrders();
    if (listOrders.length === 0) {
      return { data: "No Data Orders", status: 404 };
    } else {
      return { data: listOrders, status: 200 };
    }
  }

  // 2. Get Detail Order
  async getDetailOrder(orderId) {
    const detailOrder = await ordersRepo.getDetailOrder(orderId);
    if (detailOrder.length === 0) {
      return { data: "No Data Orders", status: 404 };
    } else {
      return { data: detailOrder, status: 200 };
    }
  }

  // 3. Get All Orders By User
  async getAllOrderByUser(userId) {
    // const listOrders = await ordersEntity.findAll();
    const listOrders = await ordersRepo.getAllOrderByUser(userId);
    if (listOrders.length === 0) {
      return { data: "No Data Orders", status: 404 };
    } else {
      return { data: listOrders, status: 200 };
    }
  }
}

module.exports = new OrdersService();
