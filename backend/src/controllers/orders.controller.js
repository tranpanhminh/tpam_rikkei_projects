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
    try {
      // const detailOrderByUser = await ordersEntity.findAll({
      //   where: { user_id: userId },
      // });

      const listOrdersByUser = await ordersEntity.findAll({
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
        where: { user_id: userId },
        // Nhóm theo id và tên của dịch vụ
        group: ["id"],
        raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
      });

      if (!listOrdersByUser) {
        return res.status(404).json({ message: "User Has No Order" });
      } else {
        return res.status(200).json(listOrdersByUser);
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
      // Kiểm tra User
      const findUser = await usersEntity.findOne({ where: { id: userId } });
      if (!findUser) {
        return res.status(404).json({ message: "User ID Not Found" });
      }

      const dataUser = findUser.dataValues;
      if (dataUser.role_id === 1 || dataUser.role_id === 2) {
        return res.status(403).json({ message: "Admin can't checkout" });
      }

      // Kiểm tra giỏ hàng
      const checkCart = await cartsEntity.findAll({
        where: { user_id: userId },
        include: [{ model: productsEntity, attributes: ["quantity_stock"] }],
      });
      // console.log(checkCart, "CHECK CART");
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

      const checkCardPayment = await paymentsEntity.findOne({
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

      const getAllCoupons = await couponsEntity.findOne({
        where: { min_bill: { [Op.lt]: cartBill[0].bill } },
        order: [["discount_rate", "DESC"]],
        limit: 1,
      });

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
      console.log(orderInfo, "ORDER INFO");

      // ----------- Xử lý giảm hàng tồn khi -------------
      let hasCreatedNewOrder = false;
      let hasPaid = false;
      let orderId;

      for (const cartProduct of checkCart) {
        const product = cartProduct.product.dataValues;
        const updatedQuantityStock =
          product.quantity_stock - cartProduct.quantity;
        console.log(updatedQuantityStock, ":ÁDDSA");

        // Cập nhật số lượng tồn kho trong bảng products
        await productsEntity.update(
          { quantity_stock: updatedQuantityStock },
          { where: { id: cartProduct.product_id } }
        );

        // Tạo đơn hàng mới nếu chưa tạo
        if (!hasCreatedNewOrder) {
          const newOrder = await ordersEntity.create(orderInfo);
          hasCreatedNewOrder = true;
          orderId = newOrder.id; // Gán orderId ở đây, không cần return
        }

        const findProduct = await productsEntity.findOne({
          where: { id: cartProduct.product_id },
        });

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

        console.log(orderItemInfo, "orderItemInfo");

        // Đẩy Cart vào giỏ hàng chi tiết
        await orderItemsEntity.create(orderItemInfo);

        // Trừ balance trong thẻ nếu chưa thanh toán
        if (!hasPaid) {
          const updatedCard = {
            ...dataCard,
            balance: (Number(dataCard.balance) - Number(totalBill)).toFixed(2),
          };
          await paymentsEntity.update(updatedCard, {
            where: { id: dataCard.id },
          });
          hasPaid = true;
        }
      }

      // Xóa toàn bộ giỏ hàng của người dùng sau khi vòng lặp
      await cartsEntity.destroy({
        where: { user_id: userId },
      });

      return res.status(200).json({ message: "Order Completed" });
    } catch (error) {
      console.log(error, "ERROR");
    }
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
