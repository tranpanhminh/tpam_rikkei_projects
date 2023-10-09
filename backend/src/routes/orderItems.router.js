const express = require("express");

// Import Model
const orderItemsModel = require("../models/orderItems.model.js");

// Import Router
const orderItemsRouter = express.Router();

// Import Controller
const orderItemsController = require("../controllers/orderItems.controller.js");

// ---------------------------------------------------------

// 1. Get Detail Order Items
orderItemsRouter.get("/", orderItemsController.getDetailOrderItems);

module.exports = orderItemsRouter;
