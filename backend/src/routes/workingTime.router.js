const express = require("express");

// Import Router
const workingTimeRouter = express.Router();

// Import Controller
const workingTimeController = require("../controllers/workingTime.controller.js");

// ---------------------------------------------------------

// 1. Get All Working Time
workingTimeRouter.get("/", workingTimeController.getAllWorkingTime);

// 2. Get Detail Working Time
workingTimeRouter.get(
  "/detail/:workingTimeId",
  workingTimeController.getDetailWorkingTime
);

// 3. Add Working Time
workingTimeRouter.post("/add", workingTimeController.addWorkingTime);

// 4. Delete Working Time
workingTimeRouter.delete(
  "/delete/:workingTimeId",
  workingTimeController.deleteWorkingTime
);

// 5. Update Working Time
workingTimeRouter.patch(
  "/update/:workingTimeId",
  workingTimeController.updateWorkingTime
);

module.exports = workingTimeRouter;
