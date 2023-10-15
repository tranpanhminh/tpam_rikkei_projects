const paymentsService = require("../services/payments.service.js");

// ---------------------------------------------------------
class PaymentsController {
  // 1. Get All Payments
  async getAllPayments(req, res) {
    const result = await paymentsService.getAllPayments();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail Payment
  async getDetailPayment(req, res) {
    const paymentId = req.params.paymentId;
    const result = await paymentsService.getDetailPayment(paymentId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add Payment
  async addPayment(req, res) {
    const dataBody = req.body;
    const result = await paymentsService.addPayment(dataBody);
    return res.status(result.status).json(result);
  }

  // 4. Delete Payment
  async deletePayment(req, res) {
    const paymentId = req.params.paymentId;
    const result = await paymentsService.deletePayment(paymentId);
    return res.status(result.status).json(result);
  }

  // 5. Update Payment
  async updatePayment(req, res) {
    const dataBody = req.body;
    const paymentId = req.params.paymentId;
    const result = await paymentsService.updatePayment(dataBody, paymentId);
    return res.status(result.status).json(result);
  }
}
module.exports = new PaymentsController();
