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
    const authHeader = req.header("Authorization");
    const result = await bookingsService.addBooking(
      dataBody,
      userId,
      serviceId,
      authHeader
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
    try {
      const userId = req.params.userId;
      const findUser = await usersEntity.findOne({
        where: { id: userId },
      });
      if (!findUser) {
        return res.status(404).json({ message: "User ID Not Found" });
      }
      const detailBooking = await bookingsEntity.findOne({
        // Chọn các thuộc tính cần thiết
        attributes: [
          "id",
          "name",
          "phone",
          "user_id",
          "service_id",
          "date",
          "status_id",
          "booking_date",
          "calendar",
          "created_at",
          "updated_at",
        ],

        // Tham gia với bảng post_types
        include: [
          {
            model: servicesEntity,
            attributes: ["name"],
          },
          {
            model: bookingStatusesEntity,
            attributes: ["name"],
          },
        ],

        // Lọc theo id của dịch vụ
        where: { user_id: userId },

        // Nhóm theo id và tên của dịch vụ
        group: ["bookings.id"],
        raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
      });
      return res
        .status(200)
        .json({ message: "Booking Filtered", data: detailBooking });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 7. Filter Booking By Date
  // async filterBookingByDate(req, res) {
  //   try {
  //     const filterBookingByDate = await bookingsEntity.findAll({
  //       attributes: [
  //         "booking_date",
  //         [sequelize.fn("COUNT", sequelize.col("id")), "total_booking"],
  //       ],
  //       group: ["booking_date"],
  //       where: {
  //         booking_date: booking_date,
  //         total_booking,
  //       },
  //     });

  //     return res.status(200).json(filterBookingByDate);
  //   } catch (error) {
  //     console.log(error, "ERROR");
  //   }
  // }
}
module.exports = new BookingsController();
