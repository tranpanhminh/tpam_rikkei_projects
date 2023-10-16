const express = require("express");

// Import Router
const orderItemsRouter = express.Router();

// Import Controller
const orderItemsController = require("../controllers/orderItems.controller.js");

// ---------------------------------------------------------

// Get Detail Order Items
orderItemsRouter.get(
  "/:orderId/detail",
  orderItemsController.getAllItemsByOrderId
);

// Report Order Item
orderItemsRouter.get("/report", orderItemsController.reportOrderItems);

module.exports = orderItemsRouter;
