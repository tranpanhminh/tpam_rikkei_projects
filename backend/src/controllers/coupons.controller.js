const couponsService = require("../services/coupons.service.js");

// ---------------------------------------------------------
class CouponsController {
  // 1. Get All Coupons
  async getAllCoupons(req, res) {
    const result = await couponsService.getAllCoupons();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail Coupon
  async getDetailCoupon(req, res) {
    const couponId = req.params.couponId;
    const result = await couponsService.getDetailCoupon(couponId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add Coupon
  async addCoupon(req, res) {
    const dataBody = req.body;
    const result = await couponsService.addCoupon(dataBody);
    return res.status(result.status).json(result);
  }

  // 4. Delete Coupon
  async deleteCoupon(req, res) {
    const couponId = req.params.couponId;
    const result = await couponsService.deleteCoupon(couponId);
    return res.status(result.status).json(result);
  }

  // 5. Update Coupon
  async updateCoupon(req, res) {
    const dataBody = req.body;
    const couponId = req.params.couponId;
    const result = await couponsService.updateCoupon(dataBody, couponId);
    return res.status(result.status).json(result);
  }
}
module.exports = new CouponsController();
