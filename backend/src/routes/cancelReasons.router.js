const express = require("express");

// Import Router
const cancelReasonsRouter = express.Router();

// Import Controller
const cancelReasonsController = require("../controllers/cancelReasons.controller.js");

// ---------------------------------------------------------

// 1. Get All Cancel Reasons
cancelReasonsRouter.get("/", cancelReasonsController.getAllCancelReasons);

// 2. Get Detail Cancel Reason
cancelReasonsRouter.get(
  "/detail/:cancelReasonId",
  cancelReasonsController.getDetailCancelReason
);

// 3. Add Cancel Reason
cancelReasonsRouter.post("/add", cancelReasonsController.addCancelReason);

// 4. Delete Cancel Reason
cancelReasonsRouter.delete(
  "/delete/:cancelReasonId",
  cancelReasonsController.deleteCancelReason
);

// // 5. Update Cancel Reason
cancelReasonsRouter.patch(
  "/update/:cancelReasonId",
  cancelReasonsController.updateCancelReason
);

module.exports = cancelReasonsRouter;
