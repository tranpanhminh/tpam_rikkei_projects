const express = require("express");

// Import Model
const orderStatusesModel = require("../models/orderStatuses.model.js");

// Import Router
const orderStatusesRouter = express.Router();

// Import Controller
const orderStatusesController = require("../controllers/orderStatuses.controller.js");

// ---------------------------------------------------------

// 1. Get All Order Statuses
orderStatusesRouter.get("/", orderStatusesController.getAllOrderStatuses);

// 2. Get Detail Order Status
orderStatusesRouter.get(
  "/detail/:orderStatusId",
  orderStatusesController.getDetailOrderStatus
);

// 3. Add Order Status
orderStatusesRouter.post("/add", orderStatusesController.addOrderStatus);

// 4. Delete Order Status
orderStatusesRouter.delete(
  "/delete/:orderStatusId",
  orderStatusesController.deleteOrderStatus
);

// 5. Update Order Status
orderStatusesRouter.patch(
  "/update/:orderStatusId",
  orderStatusesController.updateOrderStatus
);

module.exports = orderStatusesRouter;
