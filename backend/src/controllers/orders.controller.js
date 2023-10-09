const sequelize = require("../configs/db.config.js");
const connectMySQL = require("../configs/db.config.js");
const ordersModel = require("../models/orders.model.js");
const cartsModel = require("../models/carts.model.js");
const orderItemsModel = require("../models/orderItems.model.js");
const productsModel = require("../models/products.model.js");
const usersModel = require("../models/users.model.js");
const bcrypt = require("bcryptjs");
const paymentsModel = require("../models/payments.model.js");

// ---------------------------------------------------------
class OrdersController {
  // 1. Get All Orders
  async getAllOrders(req, res) {
    try {
      const listOrders = await ordersModel.findAll();
      res.status(200).json(listOrders);
      console.log(listOrders, "listOrders");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Order For Admin
  async getDetailOrder(req, res) {
    try {
      const orderId = req.params.orderId;
      const detailOrder = await ordersModel.findOne({
        where: { id: orderId },
      });
      if (!detailOrder) {
        return res.status(404).json({ message: "Order ID Not Found" });
      } else {
        return res.status(200).json(detailOrder);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Get Detail Order By User For Customer
  async getDetailOrderByUser(req, res) {
    const userId = req.params.userId;
    try {
      const detailOrderByUser = await ordersModel.findAll({
        where: { id: userId },
      });
      if (!detailOrderByUser) {
        return res.status(404).json({ message: "User Has No Order" });
      } else {
        return res.status(200).json(detailOrderByUser);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Checkout Order
  async checkoutOrder(req, res) {
    const {
      customer_name,
      address,
      phone,
      cardholder_name,
      card_number,
      expiry_date,
      cvv,
      coupon_id,
      bill,
    } = req.body;
    try {
      const userId = req.params.userId;

      // Kiểm tra giỏ hàng
      const checkCart = await cartsModel.findAll({
        where: { user_id: userId },
      });
      const dataCart = checkCart.dataValues;
      if (checkCart.length === 0) {
        return res.status(404).json({ message: "Your cart is empty" });
      }

      // Tính toán đơn hàng trong giỏ hàng
      const cartBill = await sequelize.query(
        `
        SELECT user_id, id, name, code, discount_rate, bill, discounted_amount, bill_discounted
        FROM (
          SELECT user_id, coupons.id, coupons.name, code, discount_rate, ROUND(SUM(project_module_3.carts.quantity * project_module_3.carts.price),1) AS "bill",
          ROUND(SUM(project_module_3.carts.quantity * project_module_3.carts.price * project_module_3.coupons.discount_rate / 100),1) AS "discounted_amount",
          ROUND(SUM(project_module_3.carts.quantity * project_module_3.carts.price - project_module_3.carts.quantity * project_module_3.carts.price * project_module_3.coupons.discount_rate / 100),1) AS "bill_discounted"
          FROM project_module_3.carts
          INNER JOIN project_module_3.coupons
          WHERE user_id = ${userId}
          GROUP BY user_id, coupons.id, coupons.name, coupons.code, discount_rate
          ORDER BY discount_rate DESC
        ) AS subquery
        WHERE bill > (SELECT min_bill FROM project_module_3.coupons WHERE name = subquery.name)
        LIMIT 1;
    `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      console.log(cartBill[0], "cartBill");

      // Check thông tin người dùng
      if (!customer_name) {
        return res.status(406).json({ message: "Please fill customer name" });
      }

      if (!address) {
        return res.status(406).json({ message: "Please fill address" });
      }

      if (!phone) {
        return res.status(406).json({ message: "Please fill phone number" });
      }

      const phoneNumberPattern = /^1\d{10}$/;
      if (!phoneNumberPattern.test(phone)) {
        return res.status(406).json({
          message: "Invalid Phone Number (Use the format 1234567890)",
        });
      }

      // Check thẻ thanh toán
      if (!cardholder_name) {
        return res.status(406).json({
          message: "Please fill cardholder name",
        });
      }
      if (!card_number) {
      }

      if (!expiry_date) {
        return res.status(406).json({
          message: "Please fill expiry date (Use format MM/YYYY",
        });
      }
      if (!cvv) {
        return res.status(406).json({
          message: "Please fill cardholder name",
        });
      }

      const checkCardPayment = await paymentsModel.findOne({
        where: { card_number: card_number },
      });
      if (!checkCardPayment) {
      }

      // Thông tin Order
      const orderInfo = {
        customer_name: customer_name,
        address: address,
        phone: phone,
      };
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Order
  async updatedOrder(req, res) {
    const { status_id } = req.body;
    try {
      const orderId = req.params.orderId;
      const findOrder = await ordersModel.findOne({
        where: { id: orderId },
      });
      if (!findOrder) {
        return res.status(404).json({ message: "Order ID Not Found" });
      }

      const orderInfo = {
        status_id: status_id,
        updated_at: Date.now(),
      };

      const updatedOrder = await couponsModel.update(orderInfo, {
        where: { id: orderId },
      });
      return res
        .status(200)
        .json({ message: "Order Status Updated", dataUpdated: updatedOrder });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new OrdersController();
