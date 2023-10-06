const connectMySQL = require("../configs/db.config.js");
const couponsModel = require("../models/coupons.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class CouponsController {
  // 1. Get All Coupons
  async getAllCoupons(req, res) {
    try {
      const listCoupons = await couponsModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listCoupons);
      console.log(listCoupons, "listCoupons");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Coupon
  async getDetailCoupon(req, res) {
    try {
      const couponId = req.params.couponId;
      const detailCoupon = await couponsModel.findOne({
        where: { id: couponId },
      });
      if (!detailCoupon) {
        return res.status(403).json({ message: "Coupon ID Not Found" });
      } else {
        return res.status(200).json(detailCoupon);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Coupon
  async addCoupon(req, res) {
    const { name, code, discountRate, minBill } = req.body;
    try {
      if (!name) {
        return res.status(406).json({ message: "Coupon Name not be blank" });
      }
      if (!code) {
        return res.status(406).json({ message: "Coupon Code not be blank" });
      }
      if (!discountRate) {
        return res.status(406).json({ message: "Discount rate not be blank" });
      }
      if (!minBill) {
        return res.status(406).json({ message: "Min Bill not be blank" });
      }
      if (minBill === 0) {
        return res.status(406).json({ message: "Min Bill > 0" });
      }

      const couponInfo = {
        name: name,
        code: code,
        discount_rate: discountRate,
        min_bill: minBill,
      };
      const newCoupon = await couponsModel.create(couponInfo);
      res.status(200).json({ message: "Coupon Added", data: couponInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Vendor
  async deleteCoupon(req, res) {
    try {
      const vendorId = req.params.vendorId;
      const findVendor = await vendorsModel.findOne({
        where: { id: vendorId },
      });
      if (!findVendor) {
        return res.status(403).json({ message: "Vendor ID Not Found" });
      } else {
        const deleteVendor = await vendorsModel.destroy({
          where: { id: vendorId },
        });
        return res
          .status(403)
          .json({ message: "Vendor Deleted", dataDeleted: findVendor });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Vendor
  async updateCoupon(req, res) {
    const { name } = req.body;
    try {
      if (!name) {
        return res.status(406).json({ message: "Name must not be blank" });
      }
      const vendorInfo = {
        name: name,
      };
      const vendorId = req.params.vendorId;
      const findVendor = await vendorsModel.findOne({
        where: { id: vendorId },
      });
      if (!findVendor) {
        return res.status(403).json({ message: "Vendor ID Not Found" });
      } else {
        const updatedVendor = await vendorsModel.update(vendorInfo, {
          where: { id: vendorId },
        });
        return res
          .status(403)
          .json({ message: "Vendor Updated", dataUpdated: vendorInfo });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new CouponsController();
