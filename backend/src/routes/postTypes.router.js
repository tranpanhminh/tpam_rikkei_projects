const express = require("express");

// Import Router
const postTypesRouter = express.Router();

// Import Controller
const postTypesController = require("../controllers/postTypes.controller.js");

// ---------------------------------------------------------

// 1. Get All Post Types
postTypesRouter.get("/", postTypesController.getAllPostTypes);

// 2. Get Detail Post Type
postTypesRouter.get(
  "/detail/:postTypeId",
  postTypesController.getDetailPostType
);

// 3. Add Post Type
postTypesRouter.post("/add", postTypesController.addPostType);

// 4. Delete Post Type
postTypesRouter.delete(
  "/delete/:postTypeId",
  postTypesController.deletePostType
);

// // 5. Update Post Type
postTypesRouter.patch(
  "/update/:postTypeId",
  postTypesController.updatePostType
);

module.exports = postTypesRouter;
