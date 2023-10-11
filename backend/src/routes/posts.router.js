const express = require("express");

// Import Router
const postsRouter = express.Router();

// Import Controller
const postsController = require("../controllers/posts.controller.js");
const uploadImage = require("../middlewares/CheckPostPage/uploadThumbnailPostPage.js");
// ---------------------------------------------------------

// 1. Get All Posts
postsRouter.get("/", postsController.getAllPosts);

// 2. Get Detail Post
postsRouter.get("/detail/:postId", postsController.getDetailPost);

// 3. Add Post
postsRouter.post(
  "/add",
  uploadImage.single("thumbnail_url"),
  postsController.addPost
);

// 4. Delete Post
postsRouter.delete("/delete/:postId", postsController.deletePost);

// // 5. Update Post
postsRouter.patch(
  "/update/:postId",
  uploadImage.single("thumbnail_url"),
  postsController.updatePost
);

module.exports = postsRouter;
