const express = require("express");
// 1. Vendors Router
const vendorsRouter = require("../routes/vendors.router.js");
// 2. Coupons Router
const couponsRouter = require("../routes/coupons.router.js");
// 3. Payments Router
const paymentsRouter = require("../routes/payments.router.js");
// 4. Users Router
const usersRouter = require("../routes/users.router.js");

express.Router();
// ---------------------------------------------------------

function Router(app) {
  // Vendors API
  app.use("/api/vendors", vendorsRouter);

  // Coupons API
  app.use("/api/coupons", couponsRouter);

  // Payments API
  app.use("/api/payments", paymentsRouter);

  // Users API
  app.use("/api/users", usersRouter);
}

module.exports = Router;
