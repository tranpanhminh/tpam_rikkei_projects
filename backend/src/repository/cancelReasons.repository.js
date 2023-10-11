const cancelReasonsEntity = require("../entities/cancelReasons.entity.js");

// ---------------------------------------------------------
class CancelReasonsRepo {
  async findCancelReasonById(cancelReasonId) {
    const findCancelReason = await cancelReasonsEntity.findOne({
      where: { id: cancelReasonId },
    });
    return findCancelReason;
  }

  // 1. Get All
  async getAllCancelReasons() {
    const listCancelReasons = await cancelReasonsEntity.findAll();
    return listCancelReasons;
  }

  // // 2. Get Detail
  async getDetailCancelReason(cancelReasonId) {
    const findCancelReason = await cancelReasonsEntity.findOne({
      where: { id: cancelReasonId },
    });
    return findCancelReason;
  }

  // 3. Add
  async addCancelReason(cancelReasonInfo) {
    const newCancelReason = await cancelReasonsEntity.create(cancelReasonInfo);
    return newCancelReason;
  }

  // 4. Delete
  async deleteCancelReason(cancelReasonId) {
    const deleteCancelReason = await cancelReasonsEntity.destroy({
      where: { id: cancelReasonId },
    });
    return deleteCancelReason;
  }

  // 5. Update
  async updateCancelReason(cancelReasonInfo, cancelReasonId) {
    const updateCancelReason = await cancelReasonsEntity.update(
      cancelReasonInfo,
      {
        where: { id: cancelReasonId },
      }
    );
    return updateCancelReason;
  }
}

module.exports = new CancelReasonsRepo();
