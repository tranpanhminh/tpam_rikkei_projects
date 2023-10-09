const express = require("express");

// Import Model
const orderItemsModel = require("../models/orderItems.model.js");

// Import Router
const orderItemsRouter = express.Router();

// Import Controller
const orderItemsController = require("../controllers/orderItems.controller.js");

// ---------------------------------------------------------

// 1. Get All Coupons
orderItemsRouter.get("/", orderItemsController.getAllOrderItems);

// 2. Get Detail Coupon
orderItemsRouter.get(
  "/detail/:couponId",
  orderItemsController.getDetailOrderItem
);

module.exports = orderItemsRouter;
