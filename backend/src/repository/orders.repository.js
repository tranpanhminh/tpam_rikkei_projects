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

class OrdersRepo {
  // 1. Get All Orders
  async getAllOrders() {
    const listOrders = await ordersEntity.findAll({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "user_id",
        "customer_name",
        "address",
        "phone",
        "discount_rate",
        "card_number",
        "cancellation_reason",
        "order_date",
        "bill",
        "discounted",
        "total_bill",
        "updated_at",
        "updated_at",
      ],

      // Tham gia với bảng post_types
      include: [
        {
          model: usersEntity,
          attributes: ["email"],
        },
        // {
        //   model: paymentsEntity,
        //   attributes: ["card_number"],
        // },
        {
          model: orderStatusesEntity,
          attributes: ["name"],
        },
        // {
        //   model: cancelReasonsEntity,
        //   attributes: ["name"],
        // },
        // {
        //   model: couponsEntity,
        //   attributes: ["discount_rate"],
        // },
      ],

      // Nhóm theo id và tên của dịch vụ
      group: ["orders.id"],
      raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });
    return listOrders;
  }

  // 2. Get Detail Order
  async getDetailOrder(orderId) {
    const detailOrder = await orderItemsEntity.findAll({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "order_id",
        "product_name",
        "product_description",
        "product_thumbnail",
        "quantity",
        "price",
        "created_at",
        "updated_at",
      ],

      // Tham gia với bảng post_types
      // include: [
      //   {
      //     model: productsEntity,
      //     attributes: ["name"],
      //   },
      // ],
      where: { order_id: orderId },
      // Nhóm theo id và tên của dịch vụ
      group: ["id"],
      raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });
    return detailOrder;
  }

  // 3. Get All Orders By User
  async getAllOrderByUser(userId) {
    const listOrders = await ordersEntity.findAll({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "user_id",
        "customer_name",
        "address",
        "phone",
        "discount_rate",
        "card_number",
        "cancellation_reason",
        "order_date",
        "bill",
        "discounted",
        "total_bill",
        "updated_at",
        "updated_at",
      ],

      // Tham gia với bảng post_types
      include: [
        {
          model: usersEntity,
          attributes: ["email"],
        },
        // {
        //   model: paymentsEntity,
        //   attributes: ["card_number"],
        // },
        {
          model: orderStatusesEntity,
          attributes: ["name"],
        },
        // {
        //   model: cancelReasonsEntity,
        //   attributes: ["name"],
        // },
        // {
        //   model: couponsEntity,
        //   attributes: ["discount_rate"],
        // },
      ],

      // Nhóm theo id và tên của dịch vụ
      where: { user_id: userId },
      group: ["orders.id"],
      raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });
    return listOrders;
  }
}

module.exports = new OrdersRepo();
