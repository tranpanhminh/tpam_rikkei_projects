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
// 6. Services Router
const servicesRouter = require("../routes/services.router.js");
// 7. Products Router
const productsRouter = require("../routes/products.router.js");
// 8. Product Images Router
const productImagesRouter = require("../routes/productImages.router.js");
// 9. Working Time Router
const workingTimeRouter = require("../routes/workingTime.router.js");

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

  // 6. Services API
  app.use("/api/services", servicesRouter);

  // 7. Products API
  app.use("/api/products", productsRouter);

  // 8. Product Images API
  app.use("/api/product-images", productImagesRouter);

  // 9. Working Time API
  app.use("/api/working-time", workingTimeRouter);
}

module.exports = Router;
