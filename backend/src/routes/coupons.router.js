const express = require("express");

// Import Router
const couponsRouter = express.Router();

// Import Controller
const couponsController = require("../controllers/coupons.controller.js");

// ---------------------------------------------------------

// 1. Get All Coupons
couponsRouter.get("/", couponsController.getAllCoupons);

// 2. Get Detail Coupon
couponsRouter.get("/detail/:couponId", couponsController.getDetailCoupon);

// 3. Add Coupon
couponsRouter.post("/add", couponsController.addCoupon);

// 4. Delete Coupon
couponsRouter.delete("/delete/:couponId", couponsController.deleteCoupon);

// // 5. Update Coupon
couponsRouter.patch("/update/:couponId", couponsController.updateCoupon);

module.exports = couponsRouter;
