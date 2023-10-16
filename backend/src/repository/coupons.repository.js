const couponsEntity = require("../entities/coupons.entity.js");

// ---------------------------------------------------------
class CouponsRepo {
  async findCouponById(couponId) {
    const findCoupon = await couponsEntity.findOne({
      where: { id: couponId },
    });
    return findCoupon;
  }

  // 1. Get All
  async getAllCoupons() {
    const listCoupons = await couponsEntity.findAll({
      order: [["discount_rate", "ASC"]],
    });
    return listCoupons;
  }

  // // 2. Get Detail
  async getDetailCoupon(couponId) {
    const findCoupon = await couponsEntity.findOne({
      where: { id: couponId },
    });
    return findCoupon;
  }

  // 3. Add
  async addCoupon(couponInfo) {
    const newCoupon = await couponsEntity.create(couponInfo);
    return newCoupon;
  }

  // 4. Delete
  async deleteCoupon(couponId) {
    const deleteCoupon = await couponsEntity.destroy({
      where: { id: couponId },
    });
    return deleteCoupon;
  }

  // 5. Update
  async updateCoupon(couponInfo, couponId) {
    const updateCoupon = await couponsEntity.update(couponInfo, {
      where: { id: couponId },
    });
    return updateCoupon;
  }
}

module.exports = new CouponsRepo();
