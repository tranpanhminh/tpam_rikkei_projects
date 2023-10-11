const sequelize = require("sequelize");
const bookingsEntity = require("../entities/bookings.entity.js");
const usersEntity = require("../entities/users.entity.js");
const servicesEntity = require("../entities/services.entity.js");
const bookingStatusesEntity = require("../entities/bookingStatuses.entity.js");

// ---------------------------------------------------------
class BookingsController {
  // 1. Get All Bookings
  async getAllBookings(req, res) {
    try {
      const listBookings = await bookingsEntity.findAll();

      // const listBookings = await bookingsEntity.findAll({
      //   // Chọn các thuộc tính cần thiết
      //   attributes: [
      //     "id",
      //     "name",
      //     "phone",
      //     "user_id",
      //     "service_id",
      //     "date",
      //     "status_id",
      //     "booking_date",
      //     "calendar",
      //     "created_at",
      //     "updated_at",
      //   ],

      //   // Tham gia với bảng post_types
      //   include: [
      //     {
      //       model: servicesEntity,
      //       attributes: ["name"],
      //     },
      //     {
      //       model: bookingStatusesEntity,
      //       attributes: ["name"],
      //     },
      //   ],

      //   // Nhóm theo id và tên của dịch vụ
      //   group: ["bookings.id"],
      //   raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
      // });
      res.status(200).json(listBookings);
      console.log(listBookings, "listBookings");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Booking
  async getDetailBooking(req, res) {
    try {
      const bookingId = req.params.bookingId;
      const detailBooking = await bookingsEntity.findOne({
        where: { id: bookingId },
      });

      // const detailBooking = await bookingsEntity.findOne({
      //   // Chọn các thuộc tính cần thiết
      //   attributes: [
      //     "id",
      //     "name",
      //     "phone",
      //     "user_id",
      //     "service_id",
      //     "date",
      //     "status_id",
      //     "booking_date",
      //     "calendar",
      //     "created_at",
      //     "updated_at",
      //   ],

      //   // Tham gia với bảng post_types
      //   include: [
      //     {
      //       model: servicesEntity,
      //       attributes: ["name"],
      //     },
      //     {
      //       model: bookingStatusesEntity,
      //       attributes: ["name"],
      //     },
      //   ],

      //   // Lọc theo id của dịch vụ
      //   where: { id: bookingId },

      //   // Nhóm theo id và tên của dịch vụ
      //   group: ["bookings.id"],
      //   raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
      // });

      if (!detailBooking) {
        return res.status(404).json({ message: "Booking ID Not Found" });
      } else {
        return res.status(200).json(detailBooking);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Booking
  async addBooking(req, res) {
    const { name, phone, booking_date, calendar } = req.body;
    const userId = req.params.userId;
    const serviceId = req.params.serviceId;
    try {
      // Check Login
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        return res.status(401).json({ message: "Please login to comment" });
      }
      // Check User Before Booking
      const findUser = await usersEntity.findOne({ where: { id: userId } });
      if (!findUser) {
        return res.status(404).json({ message: "User ID Not Found" });
      }
      const dataUser = findUser.dataValues;
      console.log(dataUser, "DATAUSER");
      if (dataUser.role_id === 1 || dataUser.role_id === 2) {
        return res
          .status(406)
          .json({ message: "Admin is not allowed to booking" });
      }

      if (dataUser.status_id === 2) {
        return res.status(406).json({
          message: "You can't booking because your account is inactive",
        });
      }

      // Check Service Before Booking
      const findService = await servicesEntity.findOne({
        where: { id: serviceId },
      });
      if (!findService) {
        return res.status(404).json({ message: "Service ID Not Found" });
      }
      if (!name) {
        return res.status(406).json({
          message: "Customer Name must not be blank",
        });
      }
      if (!phone) {
        return res.status(406).json({
          message: "Phone must not be blank",
        });
      }
      const phoneNumberPattern = /^1\d{10}$/;
      if (!phoneNumberPattern.test(phone)) {
        return res.status(406).json({
          message: "Invalid Phone number",
        });
      }
      if (!booking_date) {
        return res.status(406).json({
          message: "Booking Date must not be blank",
        });
      }
      if (!calendar) {
        return res.status(406).json({
          message: "Calendar must not be blank",
        });
      }
      const bookingDate = new Date(booking_date);
      const currentDate = new Date();
      if (bookingDate < currentDate) {
        return res.status(406).json({
          message: "You can't book a date in the past.",
        });
      }

      const dayOfWeek = bookingDate.getDay();

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return res.status(406).json({
          message: "You can't book on Saturday & Sunday",
        });
      }

      // Check xem người dùng đã đặt lịch vào ngày đó giờ đó chưa
      const checkBooking = await bookingsEntity.findOne({
        where: {
          user_id: userId,
          service_id: serviceId,
          booking_date: booking_date,
          calendar: calendar,
        },
      });
      console.log(checkBooking, "CHECK BOOKING");
      if (checkBooking) {
        return res.status(406).json({
          message: "You already booked this day and this time",
        });
      }

      let maxBooking = 20;

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
      console.log(filterBookingByDate, "filterBookingByDate");
      if (filterBookingByDate) {
        const transformedData = await filterBookingByDate?.map(
          (item) => item.dataValues
        );
        if (transformedData[0]?.total_booking >= maxBooking) {
          return res.status(406).json({ message: "Full Booking on this day" });
        }
      }

      const dataService = findService.dataValues;
      const copyDataService = {
        ...dataService,
      };

      const bookingInfo = {
        user_id: userId,
        service_id: copyDataService.id,
        name: name,
        phone: phone,
        status_id: 1,
        booking_date: booking_date,
        calendar: calendar,
        service_name: copyDataService.name,
        service_description: copyDataService.description,
        service_price: copyDataService.price,
        service_image: copyDataService.service_image,
      };
      console.log(bookingInfo, "BOOKING INFO");
      const newBooking = await bookingsEntity.create(bookingInfo);
      res.status(200).json({ message: "Booking Added", data: newBooking });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Booking
  async deleteBooking(req, res) {
    try {
      const bookingId = req.params.bookingId;
      const findBooking = await bookingsEntity.findOne({
        where: { id: bookingId },
      });
      if (!findBooking) {
        return res.status(404).json({ message: "Booking ID Not Found" });
      } else {
        const deleteCoupon = await bookingsEntity.destroy({
          where: { id: bookingId },
        });
        return res
          .status(200)
          .json({ message: "Coupon Deleted", dataDeleted: findBooking });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Booking
  async updateBooking(req, res) {
    const { status_id } = req.body;
    try {
      const bookingId = req.params.bookingId;
      const findBooking = await bookingsEntity.findOne({
        where: { id: bookingId },
      });
      if (!findBooking) {
        return res.status(404).json({ message: "Booking ID Not Found" });
      }
      const dataBooking = findBooking.dataValues;

      /** Booking Status:
      1. Pending
      2. Processing
      3. Done
      4. Cancel
      */

      if (dataBooking.status_id === 3) {
        res
          .status(406)
          .json({ message: "Can't updated because this booking ID is Done" });
      }

      if (dataBooking.status_id === 4) {
        res
          .status(406)
          .json({ message: "Can't updated because this booking ID is Cancel" });
      }

      const bookingInfo = {
        status_id: !status_id ? dataBooking.status_id : status_id,
        updated_at: Date.now(),
      };

      const updatedBooking = await bookingsEntity.update(bookingInfo, {
        where: { id: bookingId },
      });
      return res
        .status(200)
        .json({ message: "Booking Updated", dataUpdated: updatedBooking });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 6. Filter Booking By User ID
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
