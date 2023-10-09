const express = require("express");

// Import Model
const ordersModel = require("../models/orders.model.js");

// Import Router
const ordersRouter = express.Router();

// Import Controller
const ordersController = require("../controllers/orders.controller.js");

// ---------------------------------------------------------

// 1. Get All Coupons
ordersRouter.get("/", ordersController.getAllOrders);

// 2. Get Detail Coupon
ordersRouter.get("/detail/:couponId", ordersController.getDetailOrder);

// 3. Add Coupon
ordersRouter.post("/add", ordersController.addOrder);

// 4. Delete Coupon
ordersRouter.delete("/delete/:couponId", ordersController.deleteOrder);

// // 5. Update Coupon
ordersRouter.patch("/update/:couponId", ordersController.updatedOrder);

module.exports = ordersRouter;
