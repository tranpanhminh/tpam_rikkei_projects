const sequelize = require("sequelize");
const bookingsEntity = require("../entities/bookings.entity.js");
const usersEntity = require("../entities/users.entity.js");
const servicesEntity = require("../entities/services.entity.js");
const bookingStatusesEntity = require("../entities/bookingStatuses.entity.js");

// ---------------------------------------------------------
class BookingsRepo {
  // Find User By ID
  async findUserById(userId) {
    const findUser = await usersEntity.findOne({ where: { id: userId } });
    return findUser;
  }

  // Find Service By ID
  async findServiceById(serviceId) {
    const findService = await servicesEntity.findOne({
      where: { id: serviceId },
    });
    return findService;
  }

  // Find Booking By Id
  async findBookingById(bookingId) {
    const findBooking = await bookingsEntity.findOne({
      where: { id: bookingId },
    });
    return findBooking;
  }

  // Find Booking By User Id
  async findBookingByUserId(bookingId, userId) {
    const findBookingByUserId = await bookingsEntity.findOne({
      where: { id: bookingId, user_id: userId },
    });
    return findBookingByUserId;
  }

  // 1. Get All Bookings
  async getAllBookings() {
    const listBookings = await bookingsEntity.findAll({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "name",
        "phone",
        "user_id",
        "service_id",
        "service_name",
        "service_description",
        "service_price",
        "service_image",
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
          model: bookingStatusesEntity,
          attributes: ["name"],
        },
      ],

      // Nhóm theo id và tên của dịch vụ
      group: ["id"],
      raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });
    return listBookings;
  }

  // 2. Get Detail Booking
  async getDetailBooking(bookingId) {
    // const detailBooking = await bookingsEntity.findOne({
    //   where: { id: bookingId },
    // });

    const detailBooking = await bookingsEntity.findOne({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "name",
        "phone",
        "user_id",
        "service_id",
        "service_name",
        "service_description",
        "service_price",
        "service_image",
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
          model: bookingStatusesEntity,
          attributes: ["name"],
        },
      ],

      // Lọc theo id của dịch vụ
      where: { id: bookingId },

      // Nhóm theo id và tên của dịch vụ
      group: ["bookings.id"],
      raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });
    return detailBooking;
  }

  // 3. Add Booking
  async addBooking(bookingInfo) {
    const newBooking = await bookingsEntity.create(bookingInfo);
    return newBooking;
  }

  // 3.1. Check Booking
  async checkBooking(userId, serviceId, booking_date, calendar) {
    const checkBooking = await bookingsEntity.findOne({
      where: {
        user_id: userId,
        service_id: serviceId,
        booking_date: booking_date,
        calendar: calendar,
      },
    });
    return checkBooking;
  }

  // 3.2. Filter Booking By Date
  async filterBookingByDate(booking_date) {
    const filterBookingByDate = await bookingsEntity.findAll({
      attributes: [
        "booking_date",
        [sequelize.fn("COUNT", sequelize.col("id")), "total_booking"],
      ],
      group: ["booking_date"],
      where: {
        booking_date: booking_date,
      },
    });
    return filterBookingByDate;
  }

  // 5. Update Booking
  async updateBooking(bookingInfo, bookingId) {
    const updatedBooking = await bookingsEntity.update(bookingInfo, {
      where: { id: bookingId },
    });
    return updatedBooking;
  }
}

module.exports = new BookingsRepo();
