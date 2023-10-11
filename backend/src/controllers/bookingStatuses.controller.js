const bookingStatusesService = require("../services/bookingStatuses.service.js");

// ---------------------------------------------------------
class BookingStatusController {
  // 1. Get All Booking Status
  async getAllBookingStatus(req, res) {
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
    return res.status(result.status).json(result.data);
  }

  // 4. Delete Booking Status
  async deleteBookingStatus(req, res) {
    try {
      const bookingStatusId = req.params.bookingStatusId;
      const findBookingStatus = await bookingStatusModel.findOne({
        where: { id: bookingStatusId },
      });
      if (!findBookingStatus) {
        return res.status(404).json({ message: "Booking Status ID Not Found" });
      } else {
        const deleteBookingStatus = await bookingStatusModel.destroy({
          where: { id: bookingStatusId },
        });
        return res.status(200).json({
          message: "Post Type Deleted",
          dataDeleted: findBookingStatus,
        });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Booking Status
  async updateBookingStatus(req, res) {
    const { name } = req.body;
    try {
      const bookingStatusId = req.params.bookingStatusId;
      const findBookingStatus = await bookingStatusModel.findOne({
        where: { id: bookingStatusId },
      });

      if (!findBookingStatus) {
        return res.status(404).json({ message: "Booking Status ID Not Found" });
      }

      const dataBookingStatus = findBookingStatus.dataValues;

      const bookingStatusInfo = {
        name: !name ? dataBookingStatus.name : name,
        updated_at: Date.now(),
      };

      const updatedBookingStatus = await bookingStatusModel.update(
        bookingStatusInfo,
        {
          where: { id: bookingStatusId },
        }
      );
      return res.status(200).json({
        message: "Booking Status Updated",
        dataUpdated: updatedBookingStatus,
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}

module.exports = new BookingStatusController();
