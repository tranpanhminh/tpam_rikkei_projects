const express = require("express");

// Import Router
const pagesRouter = express.Router();

// Import Controller
const pagesController = require("../controllers/pages.controller.js");
const uploadImage = require("../middlewares/CheckPostPage/uploadThumbnailPostPage.js");
// ---------------------------------------------------------

// 1. Get All Pages
pagesRouter.get("/", pagesController.getAllPages);

// 2. Get Detail Page
pagesRouter.get("/detail/:pageId", pagesController.getDetailPage);

// 3. Add Page
pagesRouter.post(
  "/add",
  uploadImage.single("thumbnail_url"),
  pagesController.addPage
);

// 4. Delete Page
pagesRouter.delete("/delete/:pageId", pagesController.deletePage);

// // 5. Update Page
pagesRouter.patch(
  "/update/:pageId",
  uploadImage.single("thumbnail_url"),
  pagesController.updatePage
);

module.exports = pagesRouter;