const connectMySQL = require("../configs/db.config.js");
const bookingsModel = require("../models/bookings.model.js");
const usersModel = require("../models/users.model.js");
const servicesModel = require("../models/services.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class BookingsController {
  // 1. Get All Bookings
  async getAllBookings(req, res) {
    try {
      const listBookings = await bookingsModel.findAll(); // include: <Tên bảng>
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
      const detailBooking = await bookingsModel.findOne({
        where: { id: bookingId },
      });
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
      // Check User Before Booking
      const findUser = await usersModel.findOne({ where: { id: userId } });
      if (!findUser) {
        return res.status(404).json({ message: "User ID Not Found" });
      }
      const dataUser = findUser.dataValues;
      if (dataUser.role === 1) {
        return res
          .status(406)
          .json({ message: "Admin is not allowed to booking" });
      }
      if (dataUser.status === 2) {
        return res.status(406).json({
          message: "You can't booking because your account is inactive",
        });
      }

      // Check Service Before Booking
      const findService = await servicesModel.findOne({
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

      const bookingInfo = {
        user_id: userId,
        service_id: serviceId,
        name: name,
        phone: phone,
        status_id: 1,
        booking_date: booking_date,
        calendar: calendar,
      };
      console.log(bookingInfo, "BOOKING INFO");
      const newBooking = await bookingsModel.create(bookingInfo);
      res.status(200).json({ message: "Booking Added", data: newBooking });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Booking
  async deleteBooking(req, res) {
    try {
      const bookingId = req.params.bookingId;
      const findBooking = await bookingsModel.findOne({
        where: { id: bookingId },
      });
      if (!findBooking) {
        return res.status(404).json({ message: "Booking ID Not Found" });
      } else {
        const deleteCoupon = await bookingsModel.destroy({
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
    const { name, code, discount_rate, min_bill } = req.body;
    try {
      const bookingId = req.params.bookingId;
      const findBooking = await bookingsModel.findOne({
        where: { id: bookingId },
      });
      if (!findBooking) {
        return res.status(404).json({ message: "Booking ID Not Found" });
      }
      const dataBooking = findBooking.dataValues;

      if (discount_rate < 0) {
        return res.status(406).json({
          message: "Discount rate must > 0",
        });
      }
      if (min_bill < 0) {
        return res.status(406).json({
          message: "Min Bill must > 0",
        });
      }

      const bookingInfo = {
        name: !name ? dataBooking.name : name,
        code: !code ? dataBooking.code : code,
        discount_rate: !discount_rate
          ? dataBooking.discount_rate
          : discount_rate,
        min_bill: !min_bill ? dataBooking.min_bill : min_bill,
        updated_at: Date.now(),
      };

      const updatedBooking = await bookingsModel.update(bookingInfo, {
        where: { id: bookingId },
      });
      return res
        .status(200)
        .json({ message: "Booking Updated", dataUpdated: updatedBooking });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new BookingsController();
