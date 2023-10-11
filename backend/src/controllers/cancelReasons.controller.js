const cancelReasonsService = require("../services/cancelReasons.service.js");

// ---------------------------------------------------------
class CancelReasonsController {
  // 1. Get All
  async getAllCancelReasons(req, res) {
    const result = await cancelReasonsService.getAllCancelReasons();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail
  async getDetailCancelReason(req, res) {
    const cancelReasonId = req.params.cancelReasonId;
    const result = await cancelReasonsService.getDetailCancelReason(
      cancelReasonId
    );
    return res.status(result.status).json(result.data);
  }

  // 3. Add
  async addCancelReason(req, res) {
    const { name } = req.body;
    const result = await cancelReasonsService.addCancelReason(name);
    return res.status(result.status).json(result.data);
  }

  // 4. Delete
  async deleteCancelReason(req, res) {
    const cancelReasonId = req.params.cancelReasonId;
    const result = await cancelReasonsService.deleteCancelReason(
      cancelReasonId
    );
    return res.status(result.status).json(result.data);
  }

  // 5. Update
  async updateCancelReason(req, res) {
    const { name } = req.body;
    const cancelReasonId = req.params.cancelReasonId;
    const result = await cancelReasonsService.updateCancelReason(
      name,
      cancelReasonId
    );
    return res.status(result.status).json(result.data);
  }
}

module.exports = new CancelReasonsController();
