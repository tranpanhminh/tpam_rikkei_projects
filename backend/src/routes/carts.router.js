const express = require("express");

// Import Router
const cartsRouter = express.Router();

// Import Controller
const cartsController = require("../controllers/carts.controller.js");

// ----------------------MiddleWares------------------------
const checkAuthentication = require("../middlewares/CheckUser/checkAuthentication.js");
const checkRoles = require("../middlewares/CheckUser/checkRoles.js");

// ---------------------------------------------------------

// 1. Get All Carts
cartsRouter.get("/", cartsController.getAllCarts);

// 2. Get Detail Cart
cartsRouter.get("/detail/users/:userId", cartsController.getDetailCart);

// 3. Add Cart
cartsRouter.post(
  "/add/products/:productId/users/:userId",
  checkAuthentication,
  checkRoles,
  cartsController.addCart
);

// 4. Delete Cart
cartsRouter.delete(
  "/delete/products/:productId/users/:userId",
  cartsController.deleteProductFromCart
);

// 5. Delete Cart
cartsRouter.delete(
  "/delete/users/:userId",
  cartsController.deleteAllProductsFromCart
);

// 6. Update Product Quantity From Cart Page
cartsRouter.patch(
  "/update/products/:productId/users/:userId",
  cartsController.updateCart
);

module.exports = cartsRouter;
