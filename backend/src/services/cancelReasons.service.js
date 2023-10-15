const cancelReasonsRepo = require("../repository/cancelReasons.repository.js");

// ---------------------------------------------------------
class CancelReasonsService {
  // 1. Get All
  async getAllCancelReasons() {
    const listCancelReasons = await cancelReasonsRepo.getAllCancelReasons();
    if (listCancelReasons.length === 0) {
      return { data: [], status: 404 };
    } else {
      return { data: listCancelReasons, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailCancelReason(cancelReasonId) {
    const detailCancelReason = await cancelReasonsRepo.getDetailCancelReason(
      cancelReasonId
    );
    if (!detailCancelReason) {
      return { data: {}, status: 404 };
    } else {
      return { data: detailCancelReason, status: 200 };
    }
  }

  // 3. Add
  async addCancelReason(name) {
    if (!name) {
      return { message: "CancelReason Name must not be blank", status: 406 };
    } else {
      const cancelReasonInfo = {
        name: name,
      };
      await cancelReasonsRepo.addCancelReason(cancelReasonInfo);
      return { message: "CancelReason Added", status: 200 };
    }
  }

  // 4. Delete
  async deleteCancelReason(cancelReasonId) {
    const findCancelReason = await cancelReasonsRepo.findCancelReasonById(
      cancelReasonId
    );
    if (!findCancelReason) {
      return { message: "CancelReason ID Not Found", status: 404 };
    } else {
      await cancelReasonsRepo.deleteCancelReason(cancelReasonId);
      return { message: "CancelReason Deleted", status: 200 };
    }
  }

  // 5. Update
  async updateCancelReason(name, cancelReasonId) {
    const findCancelReason = await cancelReasonsRepo.findCancelReasonById(
      cancelReasonId
    );
    if (!findCancelReason) {
      return { message: "CancelReason ID Not Found", status: 404 };
    }

    const dataCancelReason = findCancelReason.dataValues;

    const cancelReasonInfo = {
      name: !name ? dataCancelReason.name : name,
      updated_at: Date.now(),
    };

    await cancelReasonsRepo.updateCancelReason(
      cancelReasonInfo,
      cancelReasonId
    );
    return { message: "CancelReason Status Updated", status: 200 };
  }
}

module.exports = new CancelReasonsService();
