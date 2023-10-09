const connectMySQL = require("../configs/db.config.js");
const cancelReasonsModel = require("../models/cancelReasons.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class CancelReasonsController {
  // 1. Get All Cancel Reasons
  async getAllCancelReasons(req, res) {
    try {
      const listCancelReasons = await cancelReasonsModel.findAll();
      res.status(200).json(listCancelReasons);
      console.log(listCancelReasons, "listCancelReasons");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Cancel Reason
  async getDetailCancelReason(req, res) {
    try {
      const cancelReasonId = req.params.cancelReasonId;
      const detailCancelReason = await cancelReasonsModel.findOne({
        where: { id: cancelReasonId },
      });
      if (!detailCoupon) {
        return res.status(404).json({ message: "Cancel Reason ID Not Found" });
      } else {
        return res.status(200).json(detailCancelReason);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Cancel Reason
  async addCancelReason(req, res) {
    const { name } = req.body;
    try {
      if (!name) {
        return res.status(406).json({ message: "Name must not be blank" });
      }
      const cancelReasonInfo = {
        name: name,
      };
      const newCancelReason = await cancelReasonsModel.create(cancelReasonInfo);
      res
        .status(200)
        .json({ message: "Cancel Reason Added", data: newCancelReason });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Cancel Reason
  async deleteCancelReason(req, res) {
    try {
      const cancelReasonId = req.params.cancelReasonId;
      const findCancelReason = await cancelReasonsModel.findOne({
        where: { id: cancelReasonId },
      });
      if (!findCancelReason) {
        return res.status(404).json({ message: "Cancel Reason ID Not Found" });
      } else {
        const deleteCancelreason = await cancelReasonsModel.destroy({
          where: { id: cancelReasonId },
        });
        return res.status(200).json({
          message: "Cancel Reason Deleted",
          dataDeleted: findCancelReason,
        });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Cancel Reason
  async updateCancelReason(req, res) {
    const { name, code, discount_rate, min_bill } = req.body;
    try {
      const cancelReasonId = req.params.cancelReasonId;
      const findCancelReason = await cancelReasonsModel.findOne({
        where: { id: cancelReasonId },
      });
      if (!findCancelReason) {
        return res.status(404).json({ message: "Cancel Reason ID Not Found" });
      }
      const dataCoupon = findCancelReason.dataValues;

      const cancelReasonInfo = {
        name: !name ? dataCoupon.name : name,
        updated_at: Date.now(),
      };

      const updatedCancelReason = await cancelReasonsModel.update(
        cancelReasonInfo,
        {
          where: { id: cancelReasonId },
        }
      );
      return res.status(200).json({
        message: "Cancel Reason Updated",
        dataUpdated: updatedCancelReason,
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new CancelReasonsController();
