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
  async addCoupon(dataBody) {
    const { name, code, discount_rate, min_bill } = dataBody;
    if (!name) {
      return { data: "Coupon Name not be blank", status: 406 };
    }
    if (!code) {
      return { data: "Coupon Code not be blank", status: 406 };
    }
    if (!discount_rate) {
      return { data: "Discount rate not be blank", status: 406 };
    }
    if (discount_rate < 0) {
      return { data: "Discount rate must > 0", status: 406 };
    }
    if (!min_bill) {
      return {
        data: "Min Bill not be blank and Min Bill must > 0",
        status: 406,
      };
    }

    if (min_bill < 0) {
      return {
        data: "Min Bill must > 0",
        status: 406,
      };
    }

    const couponInfo = {
      name: name,
      code: code,
      discount_rate: discount_rate,
      min_bill: min_bill,
    };

    await couponsRepo.addCoupon(couponInfo);
    return { data: "Coupon Added", status: 200 };
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
  async updateCoupon(dataBody, couponId) {
    const { name, code, discount_rate, min_bill } = dataBody;
    const findCoupon = await couponsRepo.findCouponById(couponId);
    if (!findCoupon) {
      return { data: "Coupon ID Not Found", status: 404 };
    }

    const dataCoupon = findCoupon.dataValues;

    if (discount_rate < 0) {
      return { data: "Discount rate must > 0", status: 406 };
    }
    if (min_bill < 0) {
      return { data: "Min Bill must > 0", status: 406 };
    }

    const couponInfo = {
      name: !name ? dataCoupon.name : name,
      code: !code ? dataCoupon.code : code,
      discount_rate: !discount_rate ? dataCoupon.discount_rate : discount_rate,
      min_bill: !min_bill ? dataCoupon.min_bill : min_bill,
      updated_at: Date.now(),
    };

    await couponsRepo.updateCoupon(couponInfo, couponId);
    return { data: "Coupon Status Updated", status: 200 };
  }
}

module.exports = new CouponsService();