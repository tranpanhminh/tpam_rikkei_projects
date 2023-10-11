const express = require("express");

// Import Router
const productsRouter = express.Router();

// Import Controller
const productsController = require("../controllers/products.controller.js");

// ---------------------------------------------------------
// Import MiddleWare
const checkAddProductForm = require("../middlewares/CheckProduct/checkAddProductForm.js");
const uploadMultipleFileAddProduct = require("../middlewares/CheckProduct/uploadMultipleFileAddProduct.js");
const uploadFileProduct = require("../middlewares/CheckProduct/uploadFileProduct.js");
// ---------------------------------------------------------
// 1. Get All Products
productsRouter.get("/", productsController.getAllProducts);

// 2. Get Detail Product
productsRouter.get("/detail/:productId", productsController.getDetailProduct);

// 3. Add Product
productsRouter.post(
  "/add",
  uploadMultipleFileAddProduct.array("image_url", 4),
  checkAddProductForm,
  productsController.addProduct
);

// 4. Delete Product
productsRouter.delete("/delete/:productId", productsController.deleteProduct);

// 5. Update Product
productsRouter.patch("/update/:productId", productsController.updateProduct);

// 6. Update Product Image
productsRouter.patch(
  "/:productId/update-image/:imageId",
  uploadFileProduct.single("image_url"),
  productsController.updateProductImage
);

// 7. Change Thumbnail
productsRouter.patch(
  "/:productId/update-thumbnail/:imageId",
  productsController.changeThumbnail
);
module.exports = productsRouter;
