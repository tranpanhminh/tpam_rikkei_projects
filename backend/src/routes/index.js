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
// 10. Bookings Router
const bookingsRouter = require("../routes/bookings.router.js");
// 11. User Roles Router
const userRolesRouter = require("../routes/userRoles.router.js");
// 12. User Status Router
const userStatusesRouter = require("./userStatuses.router.js");
// 13. Booking Status Router
const bookingStatusesRouter = require("./bookingStatuses.router.js");
// 14. Order Status Router
const orderStatusesRouter = require("./orderStatuses.router.js");
// 15. Comments Router
const productCommentsRouter = require("./productComments.router.js");
// 16. Comments Router
const serviceCommentsRouter = require("./serviceComments.router.js");
// 17. Carts Router
const cartsRouter = require("./carts.router.js");
// 18. Orders Router
const ordersRouter = require("./orders.router.js");
// 19. Orders Item Router
const orderItemsRouter = require("./orderItems.router.js");

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

  // 10. Bookings API
  app.use("/api/bookings", bookingsRouter);

  // 11. User Roles API
  app.use("/api/user-roles", userRolesRouter);

  // 12. User Status API
  app.use("/api/user-statuses", userStatusesRouter);

  // 13. Booking Status API
  app.use("/api/booking-statuses", bookingStatusesRouter);

  // 14. Order Status API
  app.use("/api/order-statuses", orderStatusesRouter);

  // 15. Product Comments API
  app.use("/api/comments/products", productCommentsRouter);

  // 16. Service Comments API
  app.use("/api/comments/services", serviceCommentsRouter);

  // 17. Carts API
  app.use("/api/carts", cartsRouter);

  // 18. Orders API
  app.use("/api/orders", ordersRouter);

  // 19. Order Items API
  app.use("/api/order-items", orderItemsRouter);
}

module.exports = Router;
