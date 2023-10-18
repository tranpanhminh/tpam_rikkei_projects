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
  // Find User By ID
  async findUserById(userId) {
    const findUser = await usersEntity.findOne({ where: { id: userId } });
    return findUser;
  }

  // Find Product By ID
  async findProductById(productId) {
    const findProduct = await productsEntity.findOne({
      where: { id: productId },
    });
    return findProduct;
  }

  // Find Order By ID
  async findOrderById(orderId) {
    const findOrder = await ordersEntity.findOne({
      where: { id: orderId },
    });
    return findOrder;
  }

  // Find Cancel Reason By ID
  async findCancelReasonById(cancel_reason_id) {
    const findCancelReason = await cancelReasonsEntity.findOne({
      where: { id: cancel_reason_id },
    });
    return findCancelReason;
  }

  // Find Card Payment By ID
  async findPaymentById(cardId) {
    const findPayment = await paymentsEntity.findOne({
      where: { id: cardId },
    });
    return findPayment;
  }

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
        "status_id",
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
      order: [["id", "DESC"]],
      // raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
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
      // raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
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
      order: [["id", "DESC"]],
      // raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });
    return listOrders;
  }

  // 4. Checkout Cart
  // 4.1. Check Cart
  async checkCart(userId) {
    const checkCart = await cartsEntity.findAll({
      where: { user_id: userId },
      include: [{ model: productsEntity, attributes: ["quantity_stock"] }],
    });
    return checkCart;
  }

  // 4.2. Check Card Payment
  async checkCardPayment(cardholder_name, card_number, expiry_date, cvv) {
    const checkCardPayment = await paymentsEntity.findOne({
      where: {
        cardholder_name: cardholder_name,
        expiry_date: expiry_date,
        card_number: card_number,
        cvv: cvv,
      },
    });
    return checkCardPayment;
  }

  // 4.3. Get All Coupons đủ điều kiện
  async getAllCoupons(bill) {
    const getAllCoupons = await couponsEntity.findOne({
      where: { min_bill: { [Op.lt]: bill } },
      order: [["discount_rate", "DESC"]],
      limit: 1,
    });
    return getAllCoupons;
  }

  // 4.4. Cập nhật số lượng hàng tồn kho trong bảng Products
  async updateProduct(updatedQuantityStock, productId) {
    const updateProduct = await productsEntity.update(
      { quantity_stock: updatedQuantityStock },
      { where: { id: productId } }
    );
    return updateProduct;
  }

  // 4.5. Tạo đơn hàng mới nếu chưa tạo
  async createNewOrder(orderInfo) {
    const newOrder = await ordersEntity.create(orderInfo);
    return newOrder;
  }

  // 4.6. Đẩy Cart vào Order chi tiết
  async pushCartToOrderItem(orderItemInfo) {
    const pushCartToOrderItem = await orderItemsEntity.create(orderItemInfo);
    return pushCartToOrderItem;
  }

  // 4.7. Cập nhật lại Payment
  async updatedCardPayment(updatedCard, cardId) {
    const updatedCardPayment = await paymentsEntity.update(updatedCard, {
      where: { id: cardId },
    });
    return updatedCardPayment;
  }

  // 4.8 Xóa toàn bộ giỏ hàng của người dùng sau khi vòng lặp
  async destroyCart(userId) {
    const destroyCart = await cartsEntity.destroy({
      where: { user_id: userId },
    });
    return destroyCart;
  }

  // 5. Update Status Order For Admin
  async updatedOrder(orderInfo, orderId) {
    const updatedOrder = await ordersEntity.update(orderInfo, {
      where: { id: orderId },
    });
    return updatedOrder;
  }

  // 6. Cancel Order
  // 6.1. Hoàn tiền lại cho Card Payment
  async cancelOrder(updatedPaymentBalance, cardId) {
    const refundCard = await paymentsEntity.update(updatedPaymentBalance, {
      where: { id: cardId },
    });
    return refundCard;
  }

  // 7. Get Order By ID
  async getOrder(orderId) {
    const findOrder = await ordersEntity.findOne({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "user_id",
        "customer_name",
        "address",
        "phone",
        "discount_rate",
        "cancellation_reason",
        "card_number",
        "order_date",
        "bill",
        "discounted",
        "total_bill",
        "card_id",
        "coupon_id",
        "status_id",
        "cancel_reason_id",
        "created_at",
        "updated_at",
      ],

      // Tham gia với bảng post_types
      include: [
        {
          model: orderStatusesEntity,
          attributes: ["name"],
        },
      ],
      group: ["id"],
      where: { id: orderId },
    });
    return findOrder;
  }
}

module.exports = new OrdersRepo();
