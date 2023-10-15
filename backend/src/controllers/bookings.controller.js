const sequelize = require("sequelize");
const bookingsEntity = require("../entities/bookings.entity.js");
const usersEntity = require("../entities/users.entity.js");
const servicesEntity = require("../entities/services.entity.js");
const bookingStatusesEntity = require("../entities/bookingStatuses.entity.js");

// Import Service
const bookingsService = require("../services/bookings.service.js");

// ---------------------------------------------------------
class BookingsController {
  // 1. Get All Bookings
  async getAllBookings(req, res) {
    const result = await bookingsService.getAllBookings();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail Booking
  async getDetailBooking(req, res) {
    const bookingId = req.params.bookingId;
    const result = await bookingsService.getDetailBooking(bookingId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add Booking
  async addBooking(req, res) {
    const dataBody = req.body;
    const userId = req.params.userId;
    const serviceId = req.params.serviceId;
    // const authHeader = req.header("Authorization");
    const result = await bookingsService.addBooking(
      dataBody,
      userId,
      serviceId
      // authHeader
    );
    return res.status(result.status).json(result.data);
  }

  // // 4. Delete Booking
  // async deleteBooking(req, res) {
  //   try {
  //     const bookingId = req.params.bookingId;
  //     const findBooking = await bookingsEntity.findOne({
  //       where: { id: bookingId },
  //     });
  //     if (!findBooking) {
  //       return res.status(404).json({ message: "Booking ID Not Found" });
  //     } else {
  //       const deleteCoupon = await bookingsEntity.destroy({
  //         where: { id: bookingId },
  //       });
  //       return res
  //         .status(200)
  //         .json({ message: "Coupon Deleted", dataDeleted: findBooking });
  //     }
  //   } catch (error) {
  //     console.log(error, "ERROR");
  //   }
  // }

  // 5. Update Booking
  async updateBooking(req, res) {
    const { status_id } = req.body;
    const bookingId = req.params.bookingId;

    const result = await bookingsService.updateBooking(status_id, bookingId);
    return res.status(result.status).json(result.data);
  }

  // 6. Cancel Booking
  async cancelBooking(req, res) {
    const bookingId = req.params.bookingId;
    const userId = req.params.userId;
    const result = await bookingsService.cancelBooking(bookingId, userId);
    return res.status(result.status).json(result.data);
  }

  // 7. Filter Booking By User ID
  async filterBookingByUserId(req, res) {
    const userId = req.params.userId;
    const result = await bookingsService.filterBookingByUserId(userId);
    return res.status(result.status).json(result.data);
  }

  // 8. Filter Booking By Date
  async filterBookingDate(req, res) {
    const date = req.params.date;
    console.log(date, "DATE");
    const result = await bookingsService.filterBookingDate(date);
    return res.status(result.status).json(result.data);
  }

  // 9. Group Booking Date
  async groupBookingDate(req, res) {
    const result = await bookingsService.groupBookingDate();
    return res.status(result.status).json(result.data);
  }
}
module.exports = new BookingsController();
