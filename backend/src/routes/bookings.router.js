const express = require("express");

// Import Router
const bookingsRouter = express.Router();

// Import Controller
const bookingsController = require("../controllers/bookings.controller.js");

// ---------------------------------------------------------

// 1. Get All Bookings
bookingsRouter.get("/", bookingsController.getAllBookings);

// 2. Get Detail Booking
bookingsRouter.get("/detail/:bookingId", bookingsController.getDetailBooking);

// 3. Add Booking
bookingsRouter.post(
  "/add/users/:userId/services/:serviceId",
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
bookingsRouter.get("/filter/:userId", bookingsController.filterBookingByUserId);

// 6. Filter Booking By Date
// bookingsRouter.get("/filter/", bookingsController.filterBookingByDate);

module.exports = bookingsRouter;
