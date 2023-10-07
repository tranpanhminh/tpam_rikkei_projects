const express = require("express");

// Import Model
const bookingsModel = require("../models/bookings.model.js");

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
bookingsRouter.post("/add", bookingsController.addBooking);

// 4. Delete Booking
bookingsRouter.delete("/delete/:bookingId", bookingsController.deleteBooking);

// // 5. Update Booking
bookingsRouter.patch("/update/:bookingId", bookingsController.updateBooking);

module.exports = bookingsRouter;
