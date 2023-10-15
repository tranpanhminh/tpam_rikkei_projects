const express = require("express");

// Import Router
const bookingsRouter = express.Router();

// Import Controller
const bookingsController = require("../controllers/bookings.controller.js");

// ----------------------MiddleWares------------------------
const checkAuthentication = require("../middlewares/CheckUser/checkAuthentication.js");
const checkRoles = require("../middlewares/CheckUser/checkRoles.js");

// ---------------------------------------------------------

// 1. Get All Bookings
bookingsRouter.get("/", bookingsController.getAllBookings);

// 2. Get Detail Booking
bookingsRouter.get("/detail/:bookingId", bookingsController.getDetailBooking);

// 3. Add Booking
bookingsRouter.post(
  "/add/users/:userId/services/:serviceId",
  checkAuthentication,
  checkRoles,
  bookingsController.addBooking
);

// // 4. Delete Booking
// bookingsRouter.delete("/delete/:bookingId", bookingsController.deleteBooking);

// 5. Update Booking By Admin
bookingsRouter.patch("/update/:bookingId", bookingsController.updateBooking);

// 6. Cancel Booking By User
bookingsRouter.patch(
  "/cancel-booking/:bookingId/users/:userId",
  bookingsController.cancelBooking
);

// 7. Filter Booking By User ID
bookingsRouter.get(
  "/filter/users/:userId",
  bookingsController.filterBookingByUserId
);

// 8. Filter Booking By Date
bookingsRouter.get("/filter/date/:date", bookingsController.filterBookingDate);

// 9. Group Booking Date
bookingsRouter.get("/group/", bookingsController.groupBookingDate);

module.exports = bookingsRouter;
