const express = require("express");

// Import Router
const orderItemsRouter = express.Router();

// Import Controller
const orderItemsController = require("../controllers/orderItems.controller.js");

// ---------------------------------------------------------

orderItemsRouter.get(
  "/:orderId/detail",
  orderItemsController.getAllItemsByOrderId
);

module.exports = orderItemsRouter;
