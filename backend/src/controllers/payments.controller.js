const connectMySQL = require("../configs/db.config.js");
const paymentsModel = require("../models/payments.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class PaymentsController {
  // Get All Payments
  async getAllPayments(req, res) {
    try {
      const listPayments = await paymentsModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listPayments);
      console.log(listPayments, "listPayments");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // Get Detail Payment
  async getDetailPayment(req, res) {
    try {
      const paymentId = req.params.paymentId;
      const detailPayment = await paymentsModel.findOne({
        where: { id: paymentId },
      });
      if (!detailPayment) {
        return res.status(403).json({ message: "Payment ID Not Found" });
      } else {
        return res.status(200).json(detailPayment);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new PaymentsController();
