const bookingStatusesEntity = require("../entities/bookingStatuses.entity.js");

// ---------------------------------------------------------
class BookingStatusesRepo {
  async findBookingStatusById(bookingStatusId) {
    const findBookingStatus = await bookingStatusesEntity.findOne({
      where: { id: bookingStatusId },
    });
    return findBookingStatus;
  }

  // 1. Get All Booking Statuses
  async getAllBookingStatuses() {
    const listBookingStatuses = await bookingStatusesEntity.findAll();
    return listBookingStatuses;
  }

  // // 2. Get Detail Booking Status
  async getDetailBookingStatus(bookingStatusId) {
    const findBookingStatus = await bookingStatusesEntity.findOne({
      where: { id: bookingStatusId },
    });
    return findBookingStatus;
  }

  // 3. Add Booking Status
  async addBookingStatus(bookingStatusInfo) {
    const newBookingStatus = await bookingStatusesEntity.create(
      bookingStatusInfo
    );
    return newBookingStatus;
  }

  // 4. Delete Booking Status
  async deleteBookingStatus(bookingStatusId) {
    const deleteBookingStatus = await bookingStatusesEntity.destroy({
      where: { id: bookingStatusId },
    });
    return deleteBookingStatus;
  }

  // // 5. Update Booking Status
  // async updateBookingStatus(bookingStatusInfo, bookingStatusId) {
  //   const updatedBookingStatus = await bookingStatusesEntity.update(
  //     bookingStatusInfo,
  //     {
  //       where: { id: bookingStatusId },
  //     }
  //   );
  //   return updatedBookingStatus;
}

module.exports = new BookingStatusesRepo();
