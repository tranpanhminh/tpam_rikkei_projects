const connectMySQL = require("../configs/db.config.js");
const cartsModel = require("../models/carts.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class CartsController {
  // 1. Get All Carts
  async getAllCarts(req, res) {
    try {
      const listCarts = await cartsModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listCarts);
      console.log(listCarts, "listCarts");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Coupon
  async getDetailCart(req, res) {
    try {
      const cartId = req.params.cartId;
      const detailCart = await cartsModel.findOne({
        where: { id: cartId },
      });
      if (!detailCart) {
        return res.status(404).json({ message: "Cart ID Not Found" });
      } else {
        return res.status(200).json(detailCart);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Coupon
  async addCart(req, res) {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { user_id, product_id, quantity, price } = req.body;
    console.log(discount_rate, "DISCOUNT RATE");
    try {
      if (!quantity) {
        return res.status(406).json({ message: "Quantity must not be blank" });
      }

      const couponInfo = {
        name: name,
        code: code,
        discount_rate: discount_rate,
        min_bill: min_bill,
      };
      const newCoupon = await cartsModel.create(couponInfo);
      res.status(200).json({ message: "Coupon Added", data: newCoupon });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Coupon
  async deleteCart(req, res) {
    try {
      const cartId = req.params.cartId;
      const findCoupon = await cartsModel.findOne({
        where: { id: cartId },
      });
      if (!findCoupon) {
        return res.status(404).json({ message: "Coupon ID Not Found" });
      } else {
        const deleteCoupon = await cartsModel.destroy({
          where: { id: cartId },
        });
        return res
          .status(200)
          .json({ message: "Coupon Deleted", dataDeleted: findCoupon });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Coupon
  async updateCart(req, res) {
    const { name, code, discount_rate, min_bill } = req.body;
    try {
      const cartId = req.params.cartId;
      const findCoupon = await cartsModel.findOne({
        where: { id: cartId },
      });
      if (!findCoupon) {
        return res.status(404).json({ message: "Coupon ID Not Found" });
      }
      const dataCoupon = findCoupon.dataValues;

      if (discount_rate < 0) {
        return res.status(406).json({
          message: "Discount rate must > 0",
        });
      }
      if (min_bill < 0) {
        return res.status(406).json({
          message: "Min Bill must > 0",
        });
      }

      const couponInfo = {
        name: !name ? dataCoupon.name : name,
        code: !code ? dataCoupon.code : code,
        discount_rate: !discount_rate
          ? dataCoupon.discount_rate
          : discount_rate,
        min_bill: !min_bill ? dataCoupon.min_bill : min_bill,
        updated_at: Date.now(),
      };

      const updatedCoupon = await cartsModel.update(couponInfo, {
        where: { id: cartId },
      });
      return res
        .status(200)
        .json({ message: "Coupon Updated", dateUpdated: updatedCoupon });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new CartsController();
