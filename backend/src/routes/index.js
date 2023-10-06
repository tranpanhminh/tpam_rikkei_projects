const express = require("express");
// Import Routers
// 1. Vendors Router
const vendorsRouter = require("../routes/vendors.router.js");
// 2. Coupons Router
const couponsRouter = require("../routes/coupons.router.js");
// 3. Payments Router
const paymentsRouter = require("../routes/payments.router.js");
// 4. Users Router
const usersRouter = require("../routes/users.router.js");
// 5. Post Types Router
const postTypesRouter = require("../routes/postTypes.router.js");

express.Router();
// ---------------------------------------------------------

function Router(app) {
  // 1. Vendors API
  app.use("/api/vendors", vendorsRouter);

  // 2. Coupons API
  app.use("/api/coupons", couponsRouter);

  // 3. Payments API
  app.use("/api/payments", paymentsRouter);

  // 4. Users API
  app.use("/api/users", usersRouter);

  // 5. Post Types API
  app.use("/api/post-types", postTypesRouter);
}

module.exports = Router;
