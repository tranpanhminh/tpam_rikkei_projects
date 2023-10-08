const express = require("express");

// Import Model
const serviceCommentsModel = require("../models/serviceComments.model.js");

// Import Router
const serviceCommentsRouter = express.Router();

// Import Controller
const serviceCommentsController = require("../controllers/serviceComments.controller.js");

// ---------------------- MiddleWares ----------------------
const checkAuthentication = require("../middlewares/CheckUser/checkAuthentication");

// ---------------------------------------------------------

// 1. Get All Service Comments
serviceCommentsRouter.get("/", serviceCommentsController.getAllServiceComments);

// 2. Get Detail Service Comment
serviceCommentsRouter.get(
  "/detail/:serviceCommentId",
  serviceCommentsController.getDetailServiceComment
);

// 3. Add Service Comment
serviceCommentsRouter.post(
  "/add/:serviceId/users/:userId",
  //   checkAuthentication,
  serviceCommentsController.addServiceComment
);

// 4. Delete Service Comment
serviceCommentsRouter.delete(
  "/delete/:serviceCommentId",
  serviceCommentsController.deleteServiceComment
);

// 5. Update Service Comment
// serviceCommentsRouter.patch(
//   "/update/:serviceCommentId",
//   serviceCommentsController.updateServiceComment
// );

module.exports = serviceCommentsRouter;
