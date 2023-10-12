const express = require("express");

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

// 3. Get Detail Service Comment
serviceCommentsRouter.get(
  "/:serviceId",
  serviceCommentsController.getDetailServiceCommentByService
);

// 4. Add Service Comment
serviceCommentsRouter.post(
  "/add/:serviceId/users/:userId",
  //   checkAuthentication,
  serviceCommentsController.addServiceComment
);

// 5. Delete Service Comment
serviceCommentsRouter.delete(
  "/delete/:serviceCommentId",
  serviceCommentsController.deleteServiceComment
);

// 6. Update Service Comment
// serviceCommentsRouter.patch(
//   "/update/:serviceCommentId",
//   serviceCommentsController.updateServiceComment
// );

module.exports = serviceCommentsRouter;
