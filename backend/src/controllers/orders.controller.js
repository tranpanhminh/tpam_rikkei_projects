const sequelize = require("../configs/db.config.js");
const { Op, col, fn } = require("sequelize");
const ordersModel = require("../models/orders.model.js");
const cartsModel = require("../models/carts.model.js");
const orderItemsModel = require("../models/orderItems.model.js");
const productsModel = require("../models/products.model.js");
const usersModel = require("../models/users.model.js");
const bcrypt = require("bcryptjs");
const paymentsModel = require("../models/payments.model.js");
const { format, parse } = require("date-fns");
const couponsModel = require("../models/coupons.model.js");

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
    } = req.body;
    try {
      const userId = req.params.userId;

      // Kiểm tra giỏ hàng
      const checkCart = await cartsModel.findAll({
        where: { user_id: userId },
        include: [{ model: productsModel, attributes: ["quantity_stock"] }],
      });
      console.log(checkCart, "CHECK CART");
      if (checkCart.length === 0) {
        return res.status(404).json({ message: "Your cart is empty" });
      }

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

      // ----------- Check thẻ thanh toán -------------
      if (!cardholder_name) {
        return res.status(406).json({
          message: "Please fill cardholder name",
        });
      }
      if (!card_number) {
        return res.status(406).json({
          message: "Please fill card number",
        });
      }
      if (card_number.toString().length < 16) {
        return res.status(406).json({
          message: "Card Number length must be 16",
        });
      }
      if (!expiry_date) {
        return res.status(406).json({
          message: "Please fill expiry date (Use format MM/YYYY",
        });
      }
      if (!cvv) {
        return res.status(406).json({
          message: "Please fill CVV",
        });
      }
      if (cvv.toString().length !== 3) {
        return res.status(406).json({
          message: "Invalid CVV Format. CVV length must be 3 (Ex: 111)",
        });
      }

      const checkCardPayment = await paymentsModel.findOne({
        where: {
          cardholder_name: cardholder_name,
          expiry_date: expiry_date,
          card_number: card_number,
          cvv: cvv,
        },
      });
      if (!checkCardPayment) {
        return res.status(406).json({
          message: "Invalid Card",
        });
      }

      const dataCard = checkCardPayment.dataValues;
      console.log(dataCard, "DATA CARD");
      // Kiểm tra Card có còn hạn sử dụng
      const currentDateTime = new Date();
      const checkValidCardDate = parse(
        dataCard.expiry_date,
        "MM/yyyy",
        new Date()
      );
      const formattedDateTime = new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        1
      );

      if (checkValidCardDate < formattedDateTime) {
        return res.status(406).json({ message: "Card is expired" });
      }

      // ----------- Check Bill & Discount -------------

      // Tính toán đơn hàng trong giỏ hàng
      const cartBill = await sequelize.query(
        `
        SELECT
          user_id,
          ROUND(SUM(carts.quantity * carts.price), 1) AS bill
        FROM
          carts
        WHERE
          user_id = :userId
      `,
        {
          replacements: { userId },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      console.log(cartBill[0].bill, "cartBill");

      const getAllCoupons = await couponsModel.findOne({
        where: { min_bill: { [Op.lt]: cartBill[0].bill } },
        order: [["discount_rate", "DESC"]],
        limit: 1,
      });

      const dataCoupon = getAllCoupons ? getAllCoupons.dataValues : 0;

      const totalBill = getAllCoupons
        ? (
            cartBill[0].bill -
            (dataCoupon.discount_rate / 100) * cartBill[0].bill
          ).toFixed(2)
        : cartBill[0].bill;
      console.log(totalBill, "TOTAL BILL");

      // ----------- Thông tin Order -------------
      /** Order Status:
        1. Pending
        2. Processing
        3. Shipping
        4. Shipped
        5. Cancel 
      */
      const orderInfo = {
        customer_name: customer_name,
        address: address,
        phone: phone,
        user_id: userId,
        card_id: dataCard.id,
        coupon_id: getAllCoupons ? dataCoupon.id : null,
        status_id: 1,
        bill: totalBill,
      };
      console.log(orderInfo, "ORDER INFO");

      // ----------- Xử lý giảm hàng tồn khi -------------
      let hasCreatedNewOrder = false;
      for (const cartProduct of checkCart) {
        const product = cartProduct.product.dataValues;
        const updatedQuantityStock =
          product.quantity_stock - cartProduct.quantity;
        console.log(updatedQuantityStock, ":ÁDDSA");
        // Cập nhật số lượng tồn kho trong bảng products
        await productsModel.update(
          { quantity_stock: updatedQuantityStock },
          { where: { id: cartProduct.product_id } }
        );
        let orderId;
        // Tạo đơn hàng mới
        if (!hasCreatedNewOrder) {
          const newOrder = await ordersModel.create(orderInfo);
          hasCreatedNewOrder = true;
          return (orderId = newOrder.id);
        }

        const orderItemInfo = {
          order_id: orderId,
          product_id: cartProduct.product_id,
          quantity: cartProduct.quantity,
          price: cartProduct.price,
        };

        // Đẩy Cart vào giỏ hàng chi tiết
        const addToOrderItem = await orderItemsModel.create(orderItemInfo);

        // Xóa Cart của User
        const deleteCartByUser = await cartsModel.destroy({
          where: { id: cartProduct.product_id },
        });

        // Trừ balance trong thẻ
        if (!hasCreatedNewOrder) {
          const updatedCart = {
            ...dataCard,
            balance: dataCard.balance - totalBill,
          };
          const newOrder = await ordersModel.update(updatedCart, {
            where: { id: dataCard.id },
          });
          hasCreatedNewOrder = true;
          return (orderId = newOrder.id);
        }
        return res.status(200).json({ message: "Order Completed" });
      }
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
