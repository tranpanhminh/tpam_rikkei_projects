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

  // 4. Checkout Cart
  async checkoutOrder(userId, dataBody) {
    const {
      customer_name,
      address,
      phone,
      cardholder_name,
      card_number,
      expiry_date,
      cvv,
    } = dataBody;
    // Kiểm tra User
    const findUser = await ordersRepo.findUserById(userId);
    if (!findUser) {
      return { data: "User ID Not Found", status: 404 };
    }

    const dataUser = findUser.dataValues;
    if (dataUser.role_id === 1 || dataUser.role_id === 2) {
      return { data: "Admin can't checkout", status: 403 };
    }

    // Kiểm tra giỏ hàng
    const checkCart = await ordersRepo.checkCart(userId);
    // console.log(checkCart, "CHECK CART");
    if (checkCart.length === 0) {
      return { data: "Your cart is empty", status: 404 };
    }

    // Check thông tin người dùng
    if (!customer_name) {
      return { data: "Please fill customer name", status: 406 };
    }

    if (!address) {
      return { data: "Please fill address", status: 406 };
    }

    if (!phone) {
      return { data: "Please fill phone number", status: 406 };
    }

    const phoneNumberPattern = /^1\d{10}$/;
    if (!phoneNumberPattern.test(phone)) {
      return {
        data: "Invalid Phone Number (Use the format 1234567890)",
        status: 406,
      };
    }

    // ----------- Check thẻ thanh toán -------------
    if (!cardholder_name) {
      return {
        data: "Please fill cardholder name",
        status: 406,
      };
    }
    if (!card_number) {
      return {
        data: "Please fill card number",
        status: 406,
      };
    }
    if (card_number.toString().length < 16) {
      return {
        data: "Card Number length must be 16",
        status: 406,
      };
    }
    if (!expiry_date) {
      return {
        data: "Please fill expiry date (Use format MM/YYYY",
        status: 406,
      };
    }
    if (!cvv) {
      return {
        data: "Please fill CVV",
        status: 406,
      };
    }
    if (cvv.toString().length !== 3) {
      return {
        data: "Invalid CVV Format. CVV length must be 3 (Ex: 111)",
        status: 406,
      };
    }

    const checkCardPayment = await ordersRepo.checkCardPayment(
      cardholder_name,
      card_number,
      expiry_date,
      cvv
    );
    if (!checkCardPayment) {
      return {
        data: "Invalid Card",
        status: 406,
      };
    }

    const dataCard = checkCardPayment.dataValues;
    // console.log(dataCard, "DATA CARD");
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
      return {
        data: "Card is expired",
        status: 406,
      };
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

    // Get Coupon đủ điều kiện
    const getAllCoupons = await ordersRepo.getAllCoupons(cartBill[0].bill);

    // ----------- Copy thông tin -------------
    // 1. Copy Card Info
    const copyCardInfo = {
      ...dataCard,
    };

    let copyCouponInfo;

    if (getAllCoupons) {
      const dataCoupon = getAllCoupons.dataValues;
      copyCouponInfo = {
        ...dataCoupon,
      };
    } else {
      copyCouponInfo = 0;
    }

    const bill = cartBill[0].bill;

    const discountedAmount = getAllCoupons
      ? ((copyCouponInfo.discount_rate / 100) * cartBill[0].bill).toFixed(2)
      : 0;

    const totalBill = (bill - discountedAmount).toFixed(2);
    // Kiểm tra balance trong thẻ
    if (dataCard.balance < totalBill) {
      return { data: "Balance is not enough", status: 406 };
    }

    // ----------- Thông tin Order -------------
    /** Order Status:
          1. Pending
          2. Processing
          3. Shipping
          4. Shipped
          5. Cancel 
        */

    const orderInfo = {
      user_id: userId,
      customer_name: customer_name,
      address: address,
      phone: phone,
      discount_rate: copyCouponInfo.discount_rate,
      card_number: copyCardInfo.card_number,
      card_id: copyCardInfo.id,
      coupon_id: getAllCoupons ? copyCouponInfo.id : null,
      status_id: 1,
      bill: bill,
      discounted: discountedAmount,
      total_bill: totalBill,
    };

    // ----------- Xử lý giảm hàng tồn khi -------------
    let hasCreatedNewOrder = false;
    let hasPaid = false;
    let orderId;

    for (const cartProduct of checkCart) {
      const product = cartProduct.product.dataValues;
      const updatedQuantityStock =
        product.quantity_stock - cartProduct.quantity;

      // Cập nhật số lượng tồn kho trong bảng products
      await ordersRepo.updateProduct(
        updatedQuantityStock,
        cartProduct.product_id
      );

      // Tạo đơn hàng mới nếu chưa tạo
      if (!hasCreatedNewOrder) {
        const newOrder = await ordersRepo.createNewOrder(orderInfo);
        hasCreatedNewOrder = true;
        orderId = newOrder.id; // Gán orderId ở đây, không cần return
      }

      const findProduct = await ordersRepo.findProductById(
        cartProduct.product_id
      );

      const dataProduct = findProduct.dataValues;

      const copyProduct = {
        ...dataProduct,
      };

      const orderItemInfo = {
        order_id: orderId, // Sử dụng orderId đã gán ở trên
        product_id: cartProduct.product_id,
        product_name: copyProduct.name,
        product_description: copyProduct.description,
        product_thumbnail: copyProduct.thumbnail_url,
        quantity: cartProduct.quantity,
        price: cartProduct.price,
      };

      // Đẩy Cart vào Order chi tiết
      await ordersRepo.pushCartToOrderItem(orderItemInfo);

      // Trừ balance trong thẻ nếu chưa thanh toán
      if (!hasPaid) {
        const updatedCard = {
          ...dataCard,
          balance: (Number(dataCard.balance) - Number(totalBill)).toFixed(2),
        };
        await ordersRepo.updatedCardPayment(updatedCard, dataCard.id);
        hasPaid = true;
      }
    }

    // Xóa toàn bộ giỏ hàng của người dùng sau khi vòng lặp
    await ordersRepo.destroyCart(userId);
    return {
      data: "Order Completed",
      status: 200,
    };
  }

  // 5. Update Status Order For Admin
  async updatedOrder(orderId, status_id) {
    const findOrder = await ordersRepo.findOrderById(orderId);
    if (!findOrder) {
      return { data: "Order ID Not Found", status: 404 };
    }

    /** Order Status:
          1. Pending
          2. Processing
          3. Shipping
          4. Shipped
          5. Cancel 
        */

    if (status_id && status_id !== 4 && findOrder.status_id === 4) {
      return {
        data: "Order can't updated because it was shipped",
        status: 406,
      };
    }

    if (status_id && status_id !== 4 && findOrder.status_id === 5) {
      return {
        data: "Order can't updated because it was canceled",
        status: 406,
      };
    }

    const orderInfo = {
      status_id: !status_id ? findOrder.status_id : status_id,
      updated_at: Date.now(),
    };

    await ordersRepo.updatedOrder(orderInfo, orderId);
    return {
      data: "Order Updated Status",
      status: 200,
    };
  }

  // 6. Cancel Order
  async cancelOrder(orderId, cancel_reason_id) {
    const findOrder = await ordersRepo.findOrderById(orderId);
    if (!findOrder) {
      return { data: "Order ID Not Found", status: 404 };
    }
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
      return { data: "Please choose cancel reasons!", status: 406 };
    }

    if (findOrder.status_id === 2) {
      return {
        data: "Order can't be cancelled because it is Processing",
        status: 406,
      };
    }

    if (findOrder.status_id === 3) {
      return {
        data: "Order can't be cancelled because it is Shipping",
        status: 406,
      };
    }

    if (findOrder.status_id === 4) {
      return {
        data: "Order can't be cancelled because it was shipped",
        status: 406,
      };
    }

    if (findOrder.status_id === 5) {
      return {
        data: "Order can't be cancelled because it was canceled",
        status: 406,
      };
    }

    // Tìm Cancel Reason
    const findCancelReason = await ordersRepo.findCancelReasonById(
      cancel_reason_id
    );

    let copyDataCancelReason;
    if (findCancelReason) {
      const dataCancelReason = findCancelReason.dataValues;
      copyDataCancelReason = {
        ...dataCancelReason,
      };
    } else {
      return { data: "Invalid Cancel Reason Id.", status: 404 };
    }

    const orderInfo = {
      cancellation_reason: copyDataCancelReason.name,
      cancel_reason_id: copyDataCancelReason.id,
      status_id: 5,
      updated_at: Date.now(),
    };

    const updatedOrder = await ordersRepo.updatedOrder(orderInfo, orderId);

    // ---------------- Hoàn lại tiền cho khách hàng ----------------
    const findPayment = await ordersRepo.findPaymentById(dataOrder.card_id);
    const dataPayment = findPayment.dataValues;

    const updatedPaymentBalance = {
      ...dataPayment,
      balance: dataPayment.balance + dataOrder.bill,
    };
    await ordersRepo.cancelOrder(updatedPaymentBalance, dataOrder.card_id);
    return { data: "Cancel Order Completed", status: 200 };
  }

  // 7. GetOrder By Order ID
  async getOrder(orderId) {
    const findOrder = await ordersRepo.getOrder(orderId);
    if (findOrder.length === 0) {
      return { data: "No Data", status: 404 };
    } else {
      return { data: findOrder, status: 200 };
    }
  }
}

module.exports = new OrdersService();
