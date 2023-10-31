const express = require("express");

// Import Router
const productCommentsRouter = express.Router();

// Import Controller
const productCommentsController = require("../controllers/productComments.controller.js");

// ---------------------- MiddleWares ----------------------
const checkAuthentication = require("../middlewares/CheckUser/checkAuthentication");
const checkRoleAdmin = require("../middlewares/CheckComment/CheckRoleAdmin.js");

// ---------------------------------------------------------

// 1. Get All Comments
productCommentsRouter.get("/", productCommentsController.getAllProductComments);

// 2. Get Detail Comment
productCommentsRouter.get(
  "/detail/:productCommentId",
  productCommentsController.getDetailProductComment
);

// 3. Get Detail Comment By Product Id
productCommentsRouter.get(
  "/:productId",
  productCommentsController.getDetailProductCommentByProduct
);

// 4. Add Comment
productCommentsRouter.post(
  "/add/:productId/users/:userId",
  checkAuthentication,
  productCommentsController.addProductComment
);

// 5. Delete Comment
productCommentsRouter.delete(
  "/delete/:productCommentId",
  checkAuthentication,
  checkRoleAdmin,
  productCommentsController.deleteProductComment
);

// 5. Update Comment
// productCommentsRouter.patch(
//   "/update/:productCommentId",
//   productCommentsController.updateProductComment
// );

module.exports = productCommentsRouter;