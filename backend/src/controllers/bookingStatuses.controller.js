const connectMySQL = require("../configs/db.config.js");
const bookingStatusModel = require("../models/bookingStatuses.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class BookingStatusController {
  // 1. Get All Booking Status
  async getAllBookingStatus(req, res) {
    try {
      const listBookingStatuses = await bookingStatusModel.findAll();
      res.status(200).json(listBookingStatuses);
      console.log(listBookingStatuses, "listBookingStatuses");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Booking Status
  async getDetailBookingStatus(req, res) {
    try {
      const bookingStatusId = req.params.bookingStatusId;
      const detailBookingStatus = await bookingStatusModel.findOne({
        where: { id: bookingStatusId },
      });
      if (!detailBookingStatus) {
        return res.status(404).json({ message: "Booking Status ID Not Found" });
      } else {
        return res.status(200).json(detailBookingStatus);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Booking Status
  async addBookingStatus(req, res) {
    const { name } = req.body;
    try {
      if (!name) {
        res
          .status(406)
          .json({ message: "Booking Status Name must not be blank" });
      } else {
        const bookingStatusInfo = {
          name: name,
        };
        const newBookingStatus = await bookingStatusModel.create(
          bookingStatusInfo
        );
        res
          .status(200)
          .json({ message: "Booking Status Added", data: newBookingStatus });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
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
