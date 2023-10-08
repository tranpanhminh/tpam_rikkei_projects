const express = require("express");

// Import Model
const userStatusesModel = require("../models/userStatuses.model.js");

// Import Router
const userStatusesRouter = express.Router();

// Import Controller
const userStatusesController = require("../controllers/userStatuses.controller.js");

// ---------------------------------------------------------

// 1. Get All User Status
userStatusesRouter.get("/", userStatusesController.getAllUserStatuses);

// 2. Get Detail User Status
userStatusesRouter.get(
  "/detail/:userStatusId",
  userStatusesController.getDetailUserStatus
);

// 3. Add User Status
userStatusesRouter.post("/add", userStatusesController.addUserStatus);

// 4. Delete User Status
userStatusesRouter.delete(
  "/delete/:userStatusId",
  userStatusesController.deleteUserStatus
);

// // 5. Update User Status
userStatusesRouter.patch(
  "/update/:userStatusId",
  userStatusesController.updateUserStatus
);

module.exports = userStatusesRouter;
