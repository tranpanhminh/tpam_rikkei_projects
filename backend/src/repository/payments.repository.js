const paymentsEntity = require("../entities/payments.entity.js");

// ---------------------------------------------------------
class PaymentsRepo {
  async findPaymentById(paymentId) {
    const findPayment = await paymentsEntity.findOne({
      where: { id: paymentId },
    });
    return findPayment;
  }

  // 1. Get All
  async getAllPayments() {
    const listPayments = await paymentsEntity.findAll();
    return listPayments;
  }

  // // 2. Get Detail
  async getDetailPayment(paymentId) {
    const findPayment = await paymentsEntity.findOne({
      where: { id: paymentId },
    });
    return findPayment;
  }

  // 3. Add
  async addPayment(paymentInfo) {
    const newPayment = await paymentsEntity.create(paymentInfo);
    return newPayment;
  }

  // 4. Delete
  async deletePayment(paymentId) {
    const deletePayment = await paymentsEntity.destroy({
      where: { id: paymentId },
    });
    return deletePayment;
  }

  // 5. Update
  async updatePayment(paymentInfo, paymentId) {
    const updatePayment = await paymentsEntity.update(paymentInfo, {
      where: { id: paymentId },
    });
    return updatePayment;
  }
}

module.exports = new PaymentsRepo();
