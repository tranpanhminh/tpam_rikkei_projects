const express = require("express");

// Import Router
const paymentsRouter = express.Router();

// Import Controller
const paymentsController = require("../controllers/payments.controller.js");

// ---------------------------------------------------------

// 1. Get All Payments
paymentsRouter.get("/", paymentsController.getAllPayments);

// 2. Get Detail Payment
paymentsRouter.get("/detail/:paymentId", paymentsController.getDetailPayment);

// 3. Add Payment
paymentsRouter.post("/add", paymentsController.addPayment);

// 4. Delete Payment
paymentsRouter.delete("/delete/:paymentId", paymentsController.deletePayment);

// 5. Update Payment
paymentsRouter.patch("/update/:paymentId", paymentsController.updatePayment);

module.exports = paymentsRouter;
