const connectMySQL = require("../configs/db.config.js");
const ordersModel = require("../models/orders.model.js");
const orderItemsModel = require("../models/orderItems.model.js");
const productsModel = require("../models/products.model.js");
const usersModel = require("../models/users.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class OrderItemsController {
  // 1. Get Detail Order Items
  async getDetailOrderItems(req, res) {
    try {
      const listCoupons = await couponsModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listCoupons);
      console.log(listCoupons, "listCoupons");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new OrderItemsController();
