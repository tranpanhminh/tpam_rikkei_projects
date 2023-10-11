const bookingStatusesRepo = require("../repository/bookingStatuses.repository.js");

// ---------------------------------------------------------
class BookingStatusesService {
  // 1. Get All Booking Statuses
  async getAllBookingStatuses() {
    const listBookingStatuses =
      await bookingStatusesRepo.getAllBookingStatuses();
    if (listBookingStatuses.length === 0) {
      return { data: "No Booking Status Found", status: 404 };
    } else {
      return { data: listBookingStatuses, status: 200 };
    }
  }

  // 2. Get Detail Booking Status
  async getDetailBookingStatus(bookingStatusId) {
    const detailBookingStatus =
      await bookingStatusesRepo.getDetailBookingStatus(bookingStatusId);
    if (!detailBookingStatus) {
      return { data: "Booking Status ID Not Found", status: 404 };
    } else {
      return { data: detailBookingStatus, status: 200 };
    }
  }

  // 3. Add Booking Status
  async addBookingStatus(name) {
    if (!name) {
      return { data: "Booking Status Name must not be blank", status: 406 };
    } else {
      const bookingStatusInfo = {
        name: name,
      };
      await bookingStatusesRepo.addBookingStatus(bookingStatusInfo);
      return { data: "Booking Status Added", status: 200 };
    }
  }

  // 4. Delete Booking Status
  async deleteBookingStatus(bookingStatusId) {
    const findBookingStatus = await bookingStatusesRepo.findBookingStatusById(
      bookingStatusId
    );
    if (!findBookingStatus) {
      return { data: "Booking Status ID Not Found", status: 404 };
    } else {
      await bookingStatusesRepo.deleteBookingStatus(bookingStatusId);
      return { data: "Booking Status Deleted", status: 200 };
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

module.exports = new BookingStatusesService();
