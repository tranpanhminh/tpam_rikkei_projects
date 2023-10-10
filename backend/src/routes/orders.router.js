const express = require("express");

// Import Model
const ordersModel = require("../models/orders.model.js");

// Import Router
const ordersRouter = express.Router();

// Import Controller
const ordersController = require("../controllers/orders.controller.js");

// ---------------------------------------------------------

// 1. Get All Orders (For Admin)
ordersRouter.get("/", ordersController.getAllOrders);

// 2. Get Detail Order (For Admin)
ordersRouter.get("/detail/:orderId", ordersController.getDetailOrder);

// 3. Get All Orders (For User)
ordersRouter.get("/users/:userId", ordersController.listOrdersByUser);

// 4. Get Detail Order (For Customer)
ordersRouter.get(
  "/detail/:orderId/users/:userId",
  ordersController.getDetailOrderByUser
);

// 5. Checkout Order
ordersRouter.post("/checkout/users/:userId", ordersController.checkoutOrder);

// 6. Update Coupon
ordersRouter.patch("/update/:orderId", ordersController.updatedOrder);

module.exports = ordersRouter;
