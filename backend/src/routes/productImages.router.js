const express = require("express");

// Import Router
const productImagesRouter = express.Router();

// Import Controller
const productImagesController = require("../controllers/productImages.controller.js");

// ---------------------------------------------------------

// 1. Get All Post Types
productImagesRouter.get("/", productImagesController.getAllProductImages);

module.exports = productImagesRouter;
