const paymentsRepo = require("../repository/payments.repository.js");

// ---------------------------------------------------------
class PaymentsService {
  // 1. Get All
  async getAllPayments() {
    const listPayments = await paymentsRepo.getAllPayments();
    if (listPayments.length === 0) {
      return { data: "No Payment Found", status: 404 };
    } else {
      return { data: listPayments, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailPayment(paymentId) {
    const detailPayment = await paymentsRepo.getDetailPayment(paymentId);
    if (!detailPayment) {
      return { data: "Payment ID Not Found", status: 404 };
    } else {
      return { data: detailPayment, status: 200 };
    }
  }

  // 3. Add
  async addPayment(dataBody) {
    const { name, code, discount_rate, min_bill } = dataBody;
    if (!name) {
      return { data: "Payment Name not be blank", status: 406 };
    }
    if (!code) {
      return { data: "Payment Code not be blank", status: 406 };
    }
    if (!discount_rate) {
      return { data: "Discount rate not be blank", status: 406 };
    }
    if (discount_rate < 0) {
      return { data: "Discount rate must > 0", status: 406 };
    }
    if (!min_bill) {
      return {
        data: "Min Bill not be blank and Min Bill must > 0",
        status: 406,
      };
    }

    if (min_bill < 0) {
      return {
        data: "Min Bill must > 0",
        status: 406,
      };
    }

    const paymentInfo = {
      name: name,
      code: code,
      discount_rate: discount_rate,
      min_bill: min_bill,
    };

    await paymentsRepo.addPayment(paymentInfo);
    return { data: "Payment Added", status: 200 };
  }

  // 4. Delete
  async deletePayment(paymentId) {
    const findPayment = await paymentsRepo.findPaymentById(paymentId);
    if (!findPayment) {
      return { data: "Payment ID Not Found", status: 404 };
    } else {
      await paymentsRepo.deletePayment(paymentId);
      return { data: "Payment Deleted", status: 200 };
    }
  }

  // 5. Update
  async updatePayment(dataBody, paymentId) {
    const { name, code, discount_rate, min_bill } = dataBody;
    const findPayment = await paymentsRepo.findPaymentById(paymentId);
    if (!findPayment) {
      return { data: "Payment ID Not Found", status: 404 };
    }

    const dataPayment = findPayment.dataValues;

    if (discount_rate < 0) {
      return { data: "Discount rate must > 0", status: 406 };
    }
    if (min_bill < 0) {
      return { data: "Min Bill must > 0", status: 406 };
    }

    const paymentInfo = {
      name: !name ? dataPayment.name : name,
      code: !code ? dataPayment.code : code,
      discount_rate: !discount_rate ? dataPayment.discount_rate : discount_rate,
      min_bill: !min_bill ? dataPayment.min_bill : min_bill,
      updated_at: Date.now(),
    };

    await paymentsRepo.updatePayment(paymentInfo, paymentId);
    return { data: "Payment Status Updated", status: 200 };
  }
}

module.exports = new PaymentsService();
