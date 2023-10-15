const bookingStatusesService = require("../services/bookingStatuses.service.js");

// ---------------------------------------------------------
class BookingStatusController {
  // 1. Get All Booking Status
  async getAllBookingStatuses(req, res) {
    const result = await bookingStatusesService.getAllBookingStatuses();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail Booking Status
  async getDetailBookingStatus(req, res) {
    const bookingStatusId = req.params.bookingStatusId;
    const result = await bookingStatusesService.getDetailBookingStatus(
      bookingStatusId
    );
    return res.status(result.status).json(result.data);
  }

  // 3. Add Booking Status
  async addBookingStatus(req, res) {
    const { name } = req.body;
    const result = await bookingStatusesService.addBookingStatus(name);
    return res.status(result.status).json(result);
  }

  // 4. Delete Booking Status
  async deleteBookingStatus(req, res) {
    const bookingStatusId = req.params.bookingStatusId;
    const result = await bookingStatusesService.deleteBookingStatus(
      bookingStatusId
    );
    return res.status(result.status).json(result);
  }

  // 5. Update Booking Status
  async updateBookingStatus(req, res) {
    const { name } = req.body;
    const bookingStatusId = req.params.bookingStatusId;
    const result = await bookingStatusesService.updateBookingStatus(
      name,
      bookingStatusId
    );
    return res.status(result.status).json(result);
  }
}

module.exports = new BookingStatusController();
