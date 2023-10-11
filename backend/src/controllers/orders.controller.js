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

  // 5. Update Order For Admin
  async updatedOrder(req, res) {
    const { status_id } = req.body;
    try {
      const orderId = req.params.orderId;
      const findOrder = await ordersEntity.findOne({
        where: { id: orderId },
      });
      if (!findOrder) {
        return res.status(404).json({ message: "Order ID Not Found" });
      }

      /** Order Status:
        1. Pending
        2. Processing
        3. Shipping
        4. Shipped
        5. Cancel 
      */

      if (findOrder.status_id === 4) {
        return res
          .status(406)
          .json({ message: "Order can't updated because it was shipped" });
      }

      if (findOrder.status_id === 5) {
        return res
          .status(406)
          .json({ message: "Order can't updated because it was canceled" });
      }

      const orderInfo = {
        status_id: status_id,
        updated_at: Date.now(),
      };

      const updatedOrder = await ordersEntity.update(orderInfo, {
        where: { id: orderId },
      });
      return res
        .status(200)
        .json({ message: "Order Status Updated", dataUpdated: updatedOrder });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 6. Cancel Order For Customer
  async cancelOrder(req, res) {
    const { cancel_reason_id } = req.body;
    try {
      const orderId = req.params.orderId;
      const findOrder = await ordersEntity.findOne({
        where: { id: orderId },
      });
      if (!findOrder) {
        return res.status(404).json({ message: "Order ID Not Found" });
      }

      console.log(findOrder, "findOrder");
      const dataOrder = findOrder.dataValues;

      /** 
       * Order Status:
        1. Pending
        2. Processing
        3. Shipping
        4. Shipped
        5. Cancel 
        
        * Cancel Reasons:
        1. Ordered the wrong product
        2. Duplicated order
        3. I don't want to buy anymore
        4. Another Reason...
      */
      if (!cancel_reason_id) {
        return res
          .status(406)
          .json({ message: "Please choose cancel reasons!" });
      }

      if (findOrder.status_id === 4) {
        return res
          .status(406)
          .json({ message: "Order can't updated because it was shipped" });
      }

      if (findOrder.status_id === 5) {
        return res
          .status(406)
          .json({ message: "Order can't updated because it was canceled" });
      }

      // Tìm Cancel Reason
      const findCancelReason = await cancelReasonsEntity.findOne({
        where: { id: cancel_reason_id },
      });

      let copyDataCancelReason;
      if (findCancelReason) {
        const dataCancelReason = findCancelReason.dataValues;
        copyDataCancelReason = {
          ...dataCancelReason,
        };
      }

      const orderInfo = {
        cancellation_reason: copyDataCancelReason.name,
        cancel_reason_id: copyDataCancelReason.id,
        status_id: 5,
        updated_at: Date.now(),
      };

      const updatedOrder = await ordersEntity.update(orderInfo, {
        where: { id: orderId },
      });

      // ---------------- Hoàn lại tiền cho khách hàng ----------------
      const findPayment = await paymentsEntity.findOne({
        where: { id: dataOrder.card_id },
      });
      const dataPayment = findPayment.dataValues;

      console.log(dataOrder.coupon_id, "DASDSDAS");

      const updatedPaymentBalance = {
        ...dataPayment,
        balance: dataPayment.balance + dataOrder.bill,
      };
      await paymentsEntity.update(updatedPaymentBalance, {
        where: { id: dataOrder.card_id },
      });
      return res
        .status(200)
        .json({ message: "Cancel Order Completed", dataUpdated: updatedOrder });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new OrdersController();
