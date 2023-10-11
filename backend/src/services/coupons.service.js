const couponsRepo = require("../repository/coupons.repository.js");

// ---------------------------------------------------------
class CouponsService {
  // 1. Get All
  async getAllCoupons() {
    const listCoupons = await couponsRepo.getAllCoupons();
    if (listCoupons.length === 0) {
      return { data: "No Coupon Found", status: 404 };
    } else {
      return { data: listCoupons, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailCoupon(couponId) {
    const detailCoupon = await couponsRepo.getDetailCoupon(couponId);
    if (!detailCoupon) {
      return { data: "Coupon ID Not Found", status: 404 };
    } else {
      return { data: detailCoupon, status: 200 };
    }
  }

  // 3. Add
  async addCoupon(name) {
    if (!name) {
      return { data: "Coupon Name must not be blank", status: 406 };
    } else {
      const couponInfo = {
        name: name,
      };
      await couponsRepo.addCoupon(couponInfo);
      return { data: "Coupon Added", status: 200 };
    }
  }

  // 4. Delete
  async deleteCoupon(couponId) {
    const findCoupon = await couponsRepo.findCouponById(couponId);
    if (!findCoupon) {
      return { data: "Coupon ID Not Found", status: 404 };
    } else {
      await couponsRepo.deleteCoupon(couponId);
      return { data: "Coupon Deleted", status: 200 };
    }
  }

  // 5. Update
  async updateCoupon(name, couponId) {
    const findCoupon = await couponsRepo.findCouponById(couponId);
    if (!findCoupon) {
      return { data: "Coupon ID Not Found", status: 404 };
    }

    const dataCoupon = findCoupon.dataValues;

    const couponInfo = {
      name: !name ? dataCoupon.name : name,
      updated_at: Date.now(),
    };

    await couponsRepo.updateCoupon(couponInfo, couponId);
    return { data: "Coupon Status Updated", status: 200 };
  }
}

module.exports = new CouponsService();
