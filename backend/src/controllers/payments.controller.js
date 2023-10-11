const paymentsEntity = require("../entities/payments.entity.js");

// ---------------------------------------------------------
class PaymentsController {
  // 1. Get All Payments
  async getAllPayments(req, res) {
    try {
      const listPayments = await paymentsEntity.findAll(); // include: <Tên bảng>
      res.status(200).json(listPayments);
      console.log(listPayments, "listPayments");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Payment
  async getDetailPayment(req, res) {
    try {
      const paymentId = req.params.paymentId;
      const detailPayment = await paymentsEntity.findOne({
        where: { id: paymentId },
      });
      if (!detailPayment) {
        return res.status(404).json({ message: "Payment ID Not Found" });
      } else {
        return res.status(200).json(detailPayment);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Payment
  async addPayment(req, res) {
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
      const newPayment = await paymentsEntity.create(paymentInfo);
      res.status(200).json({ message: "Payment Added", data: newPayment });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Payment
  async deletePayment(req, res) {
    try {
      const paymentId = req.params.paymentId;
      const findPayment = await paymentsEntity.findOne({
        where: { id: paymentId },
      });
      if (!findPayment) {
        return res.status(404).json({ message: "Payment ID Not Found" });
      } else {
        const deletePayment = await paymentsEntity.destroy({
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

  // 5. Update Payment
  async updatePayment(req, res) {
    const { cardholder_name, card_number, expiry_date, cvv, balance } =
      req.body;
    try {
      const paymentId = req.params.paymentId;
      const findPayment = await paymentsEntity.findOne({
        where: { id: paymentId },
      });

      if (!findPayment) {
        return res.status(404).json({ message: "Payment ID Not Found" });
      }
      const dataPayment = findPayment.dataValues;

      if (card_number && card_number.toString().length !== 16) {
        return res
          .status(406)
          .json({ message: "Card Number length must = 16" });
      }

      if (cvv && cvv.toString().length !== 3) {
        return res.status(406).json({ message: "CVV length must = 3" });
      }
      if (balance < 0) {
        return res.status(406).json({ message: "Balance must not be < 0" });
      }

      const paymentInfo = {
        cardholder_name: !cardholder_name
          ? dataPayment.cardholder_name
          : cardholder_name,
        card_number: !card_number ? dataPayment.card_number : card_number,
        expiry_date: !expiry_date ? dataPayment.expiry_date : expiry_date,
        cvv: !cvv ? dataPayment.cvv : cvv,
        balance: !balance ? dataPayment.balance : balance,
        updated_at: Date.now(),
      };

      const updatedPayment = await paymentsEntity.update(paymentInfo, {
        where: { id: paymentId },
      });
      return res
        .status(200)
        .json({ message: "Payment Updated", dateUpdated: updatedPayment });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new PaymentsController();
