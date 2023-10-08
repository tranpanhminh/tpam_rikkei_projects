const express = require("express");

// Import Model
const bookingStatusModel = require("../models/bookingStatuses.model.js");

// Import Router
const bookingStatusesRouter = express.Router();

// Import Controller
const bookingStatusesController = require("../controllers/bookingStatuses.controller.js");

// ---------------------------------------------------------

// 1. Get All Booking Status
bookingStatusesRouter.get("/", bookingStatusesController.getAllBookingStatus);

// 2. Get Detail Booking Status
bookingStatusesRouter.get(
  "/detail/:bookingStatusId",
  bookingStatusesController.getDetailBookingStatus
);

// 3. Add Booking Status
bookingStatusesRouter.post("/add", bookingStatusesController.addBookingStatus);

// 4. Delete Booking Status
bookingStatusesRouter.delete(
  "/delete/:bookingStatusId",
  bookingStatusesController.deleteBookingStatus
);

// 5. Update Booking Status
bookingStatusesRouter.patch(
  "/update/:bookingStatusId",
  bookingStatusesController.updateBookingStatus
);

module.exports = bookingStatusesRouter;
