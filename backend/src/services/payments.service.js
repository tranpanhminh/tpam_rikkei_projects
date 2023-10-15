const paymentsRepo = require("../repository/payments.repository.js");

// ---------------------------------------------------------
class PaymentsService {
  // 1. Get All
  async getAllPayments() {
    const listPayments = await paymentsRepo.getAllPayments();
    if (listPayments.length === 0) {
      return { data: [], status: 404 };
    } else {
      return { data: listPayments, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailPayment(paymentId) {
    const detailPayment = await paymentsRepo.getDetailPayment(paymentId);
    if (!detailPayment) {
      return { data: {}, status: 404 };
    } else {
      return { data: detailPayment, status: 200 };
    }
  }

  // 3. Add
  async addPayment(dataBody) {
    const { cardholder_name, card_number, expiry_date, cvv, balance } =
      dataBody;

    if (!cardholder_name) {
      return {
        message: "Cardholder Name must not be blank",
        status: 406,
      };
    }
    if (!card_number) {
      return {
        message: "Card Number must not be blank",
        status: 406,
      };
    }
    if (card_number.toString().length !== 16) {
      return {
        message: "Card Number length must = 16",
        status: 406,
      };
    }
    if (!expiry_date) {
      return {
        message: "Expiry Date must not be blank",
        status: 406,
      };
    }
    if (!cvv) {
      return {
        message: "CVV must not be blank",
        status: 406,
      };
    }
    if (cvv.toString().length !== 3) {
      return {
        message: "CVV length must = 3",
        status: 406,
      };
    }
    if (balance < 0) {
      return {
        message: "Balance must not be < 0",
        status: 406,
      };
    }

    const paymentInfo = {
      cardholder_name: cardholder_name,
      card_number: card_number,
      expiry_date: expiry_date,
      cvv: cvv,
      balance: balance,
    };

    await paymentsRepo.addPayment(paymentInfo);
    return { message: "Payment Added", status: 200 };
  }

  // 4. Delete
  async deletePayment(paymentId) {
    const findPayment = await paymentsRepo.findPaymentById(paymentId);
    if (!findPayment) {
      return { message: "Payment ID Not Found", status: 404 };
    } else {
      await paymentsRepo.deletePayment(paymentId);
      return { message: "Payment Deleted", status: 200 };
    }
  }

  // 5. Update
  async updatePayment(dataBody, paymentId) {
    const { cardholder_name, card_number, expiry_date, cvv, balance } =
      dataBody;
    const findPayment = await paymentsRepo.findPaymentById(paymentId);
    if (!findPayment) {
      return { message: "Payment ID Not Found", status: 404 };
    }

    const dataPayment = findPayment.dataValues;

    if (card_number && card_number.toString().length !== 16) {
      return { message: "Card Number length must = 16", status: 406 };
    }

    if (cvv && cvv.toString().length !== 3) {
      return { message: "CVV length must = 3", status: 406 };
    }
    if (balance < 0) {
      return { message: "Balance must not be < 0", status: 406 };
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

    await paymentsRepo.updatePayment(paymentInfo, paymentId);
    return { message: "Payment Status Updated", status: 200 };
  }
}

module.exports = new PaymentsService();
