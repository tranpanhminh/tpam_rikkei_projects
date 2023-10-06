const express = require("express");

// Import Model
const paymentsModel = require("../models/payments.model.js");

// Import Router
const paymentsRouter = express.Router();

// Import Controller
const paymentsController = require("../controllers/payments.controller.js");

// ---------------------------------------------------------

// 1. Get All Payments
paymentsRouter.get("/", paymentsController.getAllPayments);

// 2. Get Detail Payment
paymentsRouter.get("/detail/:paymentId", paymentsController.getDetailPayment);
// Get User Detail
// usersRouter.get("/detail/:userId", usersController.getUserDetail);
module.exports = paymentsRouter;
