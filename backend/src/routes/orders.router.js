const express = require("express");

// Import Model
const ordersModel = require("../models/orders.model.js");

// Import Router
const ordersRouter = express.Router();

// Import Controller
const ordersController = require("../controllers/orders.controller.js");

// ---------------------------------------------------------

// 1. Get All Orders
ordersRouter.get("/", ordersController.getAllOrders);

// 2. Get Detail Order (For Admin)
ordersRouter.get("/detail/:orderId", ordersController.getDetailOrder);

// 3. Get Detail Order (For Admin)
ordersRouter.get(
  "/detail/users/:userId",
  ordersController.getDetailOrderByUser
);

// 4. Checkout Order
ordersRouter.post("/checkout/users/:userId", ordersController.checkoutOrder);

// 5. Update Coupon
ordersRouter.patch("/update/:orderId", ordersController.updatedOrder);

module.exports = ordersRouter;
