const express = require("express");

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
ordersRouter.get("/users/:userId", ordersController.getAllOrderByUser);

// 4. Checkout Order
ordersRouter.post("/checkout/users/:userId", ordersController.checkoutOrder);

// 5. Update Order
ordersRouter.patch("/update/:orderId", ordersController.updatedOrder);

// 5. Cancel Order
ordersRouter.patch("/cancel-order/:orderId/", ordersController.cancelOrder);

module.exports = ordersRouter;
