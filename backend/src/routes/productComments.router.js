const express = require("express");

// Import Model
const commentsModel = require("../models/productComments.model.js");

// Import Router
const productCommentsRouter = express.Router();

// Import Controller
const productCommentsController = require("../controllers/productComments.controller.js");

// ---------------------- MiddleWares ----------------------
const checkAuthentication = require("../middlewares/CheckUser/checkAuthentication");

// ---------------------------------------------------------

// 1. Get All Comments
productCommentsRouter.get("/", productCommentsController.getAllProductComments);

// 2. Get Detail Comment
productCommentsRouter.get(
  "/detail/:productCommentId",
  productCommentsController.getDetailProductComment
);

// 3. Add Comment
productCommentsRouter.post(
  "/add/:productId/users/:userId",
  //   checkAuthentication,
  productCommentsController.addProductComment
);

// 4. Delete Comment
productCommentsRouter.delete(
  "/delete/:productCommentId",
  productCommentsController.deleteProductComment
);

// 5. Update Comment
// productCommentsRouter.patch(
//   "/update/:productCommentId",
//   productCommentsController.updateProductComment
// );

module.exports = productCommentsRouter;
