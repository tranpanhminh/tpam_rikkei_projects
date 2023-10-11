const connectMySQL = require("../configs/db.config.js");
const productImagesEntity = require("../entities/productImages.entity.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class ProductImagesController {
  // 1. Get All Product Images
  async getAllProductImages(req, res) {
    try {
      const listAllProductImages = await productImagesEntity.findAll(); // include: <Tên bảng>
      res.status(200).json(listAllProductImages);
      console.log(listAllProductImages, "listAllProductImages");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  //   // 2. Get Detail Coupon
  //   async getDetailCoupon(req, res) {
  //     try {
  //       const couponId = req.params.couponId;
  //       const detailCoupon = await couponsEntity.findOne({
  //         where: { id: couponId },
  //       });
  //       if (!detailCoupon) {
  //         return res.status(404).json({ message: "Coupon ID Not Found" });
  //       } else {
  //         return res.status(200).json(detailCoupon);
  //       }
  //     } catch (error) {
  //       console.log(error, "ERROR");
  //     }
  //   }

  //   // 3. Add Coupon
  //   async addCoupon(req, res) {
  //     const { name, code, discount_rate, min_bill } = req.body;
  //     console.log(discount_rate, "DISCOUNT RATE");
  //     try {
  //       if (!name) {
  //         return res.status(406).json({ message: "Coupon Name not be blank" });
  //       }
  //       if (!code) {
  //         return res.status(406).json({ message: "Coupon Code not be blank" });
  //       }
  //       if (!discount_rate) {
  //         return res.status(406).json({
  //           message: "Discount rate not be blank",
  //         });
  //       }
  //       if (discount_rate < 0) {
  //         return res.status(406).json({
  //           message: "Discount rate must > 0",
  //         });
  //       }
  //       if (!min_bill) {
  //         return res
  //           .status(406)
  //           .json({ message: "Min Bill not be blank and Min Bill must > 0" });
  //       }

  //       if (min_bill < 0) {
  //         return res.status(406).json({
  //           message: "Min Bill must > 0",
  //         });
  //       }

  //       const couponInfo = {
  //         name: name,
  //         code: code,
  //         discount_rate: discount_rate,
  //         min_bill: min_bill,
  //       };
  //       const newCoupon = await couponsEntity.create(couponInfo);
  //       res.status(200).json({ message: "Coupon Added", data: couponInfo });
  //     } catch (error) {
  //       console.log(error, "ERROR");
  //     }
  //   }

  //   // 4. Delete Coupon
  //   async deleteCoupon(req, res) {
  //     try {
  //       const couponId = req.params.couponId;
  //       const findCoupon = await couponsEntity.findOne({
  //         where: { id: couponId },
  //       });
  //       if (!findCoupon) {
  //         return res.status(404).json({ message: "Coupon ID Not Found" });
  //       } else {
  //         const deleteCoupon = await couponsEntity.destroy({
  //           where: { id: couponId },
  //         });
  //         return res
  //           .status(200)
  //           .json({ message: "Coupon Deleted", dataDeleted: findCoupon });
  //       }
  //     } catch (error) {
  //       console.log(error, "ERROR");
  //     }
  //   }

  //   // 5. Update Coupon
  //   async updateCoupon(req, res) {
  //     const { name, code, discount_rate, min_bill } = req.body;
  //     try {
  //       const couponId = req.params.couponId;
  //       const findCoupon = await couponsEntity.findOne({
  //         where: { id: couponId },
  //       });
  //       if (!findCoupon) {
  //         return res.status(404).json({ message: "Coupon ID Not Found" });
  //       }
  //       const dataCoupon = findCoupon.dataValues;

  //       if (discount_rate < 0) {
  //         return res.status(406).json({
  //           message: "Discount rate must > 0",
  //         });
  //       }
  //       if (min_bill < 0) {
  //         return res.status(406).json({
  //           message: "Min Bill must > 0",
  //         });
  //       }

  //       const couponInfo = {
  //         name: !name ? dataCoupon.name : name,
  //         code: !code ? dataCoupon.code : code,
  //         discount_rate: !discount_rate
  //           ? dataCoupon.discount_rate
  //           : discount_rate,
  //         min_bill: !min_bill ? dataCoupon.min_bill : min_bill,
  //         updated_at: Date.now(),
  //       };

  //       const updatedCoupon = await couponsEntity.update(couponInfo, {
  //         where: { id: couponId },
  //       });
  //       return res
  //         .status(200)
  //         .json({ message: "Coupon Updated", dateUpdated: couponInfo });
  //     } catch (error) {
  //       console.log(error, "ERROR");
  //     }
  //   }
}
module.exports = new ProductImagesController();
