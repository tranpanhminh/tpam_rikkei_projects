const connectMySQL = require("../configs/db.config.js");
const usersModel = require("../models/users.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class UsersController {
  // 1. Get All Payments
  async getAllUsers(req, res) {
    try {
      const listUsers = await usersModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listUsers);
      console.log(listUsers, "listUsers");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Payment
  async getDetailUser(req, res) {
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

  // 3. Register User (Customer)
  async registerUser(req, res) {
    const { cardholder_name, card_number, expiry_date, cvv, balance } =
      req.body;
    console.log(card_number.toString().length, "AAAAAAAAAAAAAAAA");
    console.log(req.body, " req.body");
    try {
      if (!cardholder_name) {
        return res
          .status(406)
          .json({ message: "Cardholder Name must not be blank" });
      }
      if (!card_number) {
        return res
          .status(406)
          .json({ message: "Card Number must not be blank" });
      }
      if (card_number.toString().length !== 16) {
        return res
          .status(406)
          .json({ message: "Card Number length must = 16" });
      }
      if (!expiry_date) {
        return res.status(406).json({
          message: "Expiry Date must not be blank",
        });
      }
      if (!cvv) {
        return res.status(406).json({ message: "CVV must not be blank" });
      }
      if (cvv.toString().length !== 3) {
        return res.status(406).json({ message: "CVV length must = 3" });
      }
      if (balance < 0) {
        return res.status(406).json({ message: "Balance must not be < 0" });
      }

      const paymentInfo = {
        cardholder_name: cardholder_name,
        card_number: card_number,
        expiry_date: expiry_date,
        cvv: cvv,
        balance: balance,
      };
      console.log(paymentInfo, "paymentInfo");
      const newPayment = await paymentsModel.create(paymentInfo);
      res.status(200).json({ message: "Payment Added", data: paymentInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Add User (Admin)
  async addUser(req, res) {
    const { cardholder_name, card_number, expiry_date, cvv, balance } =
      req.body;
    console.log(card_number.toString().length, "AAAAAAAAAAAAAAAA");
    console.log(req.body, " req.body");
    try {
      if (!cardholder_name) {
        return res
          .status(406)
          .json({ message: "Cardholder Name must not be blank" });
      }
      if (!card_number) {
        return res
          .status(406)
          .json({ message: "Card Number must not be blank" });
      }
      if (card_number.toString().length !== 16) {
        return res
          .status(406)
          .json({ message: "Card Number length must = 16" });
      }
      if (!expiry_date) {
        return res.status(406).json({
          message: "Expiry Date must not be blank",
        });
      }
      if (!cvv) {
        return res.status(406).json({ message: "CVV must not be blank" });
      }
      if (cvv.toString().length !== 3) {
        return res.status(406).json({ message: "CVV length must = 3" });
      }
      if (balance < 0) {
        return res.status(406).json({ message: "Balance must not be < 0" });
      }

      const paymentInfo = {
        cardholder_name: cardholder_name,
        card_number: card_number,
        expiry_date: expiry_date,
        cvv: cvv,
        balance: balance,
      };
      console.log(paymentInfo, "paymentInfo");
      const newPayment = await paymentsModel.create(paymentInfo);
      res.status(200).json({ message: "Payment Added", data: paymentInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Delete Payment
  async deleteUser(req, res) {
    try {
      const paymentId = req.params.paymentId;
      const findPayment = await paymentsModel.findOne({
        where: { id: paymentId },
      });
      if (!findPayment) {
        return res.status(404).json({ message: "Payment ID Not Found" });
      } else {
        const deletePayment = await paymentsModel.destroy({
          where: { id: paymentId },
        });
        return res
          .status(200)
          .json({ message: "Payment Deleted", dataDeleted: findPayment });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 6. Update Payment
  async updateUser(req, res) {
    const { cardholder_name, card_number, expiry_date, cvv, balance } =
      req.body;
    try {
      const paymentId = req.params.paymentId;
      const findPayment = await paymentsModel.findOne({
        where: { id: paymentId },
      });

      if (!findPayment) {
        return res.status(404).json({ message: "Payment ID Not Found" });
      }

      if (!cardholder_name) {
        return res
          .status(406)
          .json({ message: "Cardholder Name must not be blank" });
      }
      if (!card_number) {
        return res
          .status(406)
          .json({ message: "Card Number must not be blank" });
      }
      if (card_number.toString().length !== 16) {
        return res
          .status(406)
          .json({ message: "Card Number length must = 16" });
      }
      if (!expiry_date) {
        return res.status(406).json({
          message: "Expiry Date must not be blank",
        });
      }
      if (!cvv) {
        return res.status(406).json({ message: "CVV must not be blank" });
      }
      if (cvv.toString().length !== 3) {
        return res.status(406).json({ message: "CVV length must = 3" });
      }
      if (balance < 0) {
        return res.status(406).json({ message: "Balance must not be < 0" });
      }

      const paymentInfo = {
        cardholder_name: cardholder_name,
        card_number: card_number,
        expiry_date: expiry_date,
        cvv: cvv,
        balance: balance,
      };

      const updatedPayment = await paymentsModel.update(paymentInfo, {
        where: { id: paymentId },
      });
      return res
        .status(200)
        .json({ message: "Payment Updated", dateUpdated: paymentInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new UsersController();
