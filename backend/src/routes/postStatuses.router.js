const express = require("express");

// Import Router
const postStatusesRouter = express.Router();

// Import Controller
const postStatusesController = require("../controllers/postStatuses.controller.js");

// ---------------------------------------------------------

// 1. Get All Order Statuses
postStatusesRouter.get("/", postStatusesController.getAllPostStatuses);

// 2. Get Detail Order Status
postStatusesRouter.get(
  "/detail/:postStatusId",
  postStatusesController.getDetailPostStatus
);

// 3. Add Order Status
postStatusesRouter.post("/add", postStatusesController.addPostStatus);

// 4. Delete Order Status
postStatusesRouter.delete(
  "/delete/:postStatusId",
  postStatusesController.deletePostStatus
);

// 5. Update Order Status
postStatusesRouter.patch(
  "/update/:postStatusId",
  postStatusesController.updatePostStatus
);

module.exports = postStatusesRouter;
