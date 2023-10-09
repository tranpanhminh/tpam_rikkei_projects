const connectMySQL = require("../configs/db.config.js");
const ordersModel = require("../models/orders.model.js");
const orderItemsModel = require("../models/orderItems.model.js");
const productsModel = require("../models/products.model.js");
const usersModel = require("../models/users.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class OrderItemsController {
  // 1. Get All Order Items
  async getAllOrderItems(req, res) {
    try {
      const listCoupons = await couponsModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listCoupons);
      console.log(listCoupons, "listCoupons");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Order Item
  async getDetailOrderItem(req, res) {
    try {
      const couponId = req.params.couponId;
      const detailCoupon = await couponsModel.findOne({
        where: { id: couponId },
      });
      if (!detailCoupon) {
        return res.status(404).json({ message: "Coupon ID Not Found" });
      } else {
        return res.status(200).json(detailCoupon);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new OrderItemsController();
