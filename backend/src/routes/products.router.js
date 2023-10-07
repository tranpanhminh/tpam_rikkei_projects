const express = require("express");

// Import Model
const productsModel = require("../models/products.model.js");

// Import Router
const productsRouter = express.Router();

// Import Controller
const productsController = require("../controllers/products.controller.js");

// ---------------------------------------------------------
// Import MiddleWare
const checkAddProductForm = require("../middlewares/CheckProduct/checkAddProductForm.js");
const uploadFileAddProduct = require("../middlewares/CheckProduct/uploadFileAddProduct.js");

// ---------------------------------------------------------
// 1. Get All Products
productsRouter.get("/", productsController.getAllProducts);

// 2. Get Detail Product
productsRouter.get("/detail/:productId", productsController.getDetailProduct);

// 3. Add Product
productsRouter.post(
  "/add",
  uploadFileAddProduct.array("image_url", 4),
  checkAddProductForm,
  productsController.addProduct
);

// 4. Delete Product
productsRouter.delete("/delete/:productId", productsController.deleteProduct);

// 5. Update Product
productsRouter.patch("/update/:productId", productsController.updateProduct);

module.exports = productsRouter;
