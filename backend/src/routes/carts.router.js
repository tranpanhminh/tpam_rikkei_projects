const express = require("express");

// Import Model
const cartsModel = require("../models/carts.model.js");

// Import Router
const cartsRouter = express.Router();

// Import Controller
const cartsController = require("../controllers/carts.controller.js");

// ----------------------MiddleWares------------------------
const checkAuthentication = require("../middlewares/CheckUser/checkAuthentication.js");

// ---------------------------------------------------------

// 1. Get All Carts
cartsRouter.get("/", cartsController.getAllCarts);

// 2. Get Detail Cart
cartsRouter.get("/detail/users/:userId", cartsController.getDetailCart);

// 3. Add Cart
cartsRouter.post(
  "/add/products/:productId/users/:userId",
  // checkAuthentication,
  cartsController.addCart
);

// 4. Delete Cart
cartsRouter.delete(
  "/delete/products/:productId/users/:userId",
  cartsController.deleteProductFromCart
);

// 4. Delete Cart
cartsRouter.delete(
  "/delete/users/:userId",
  cartsController.deleteAllProductsFromCart
);

// // 5. Update Cart
cartsRouter.patch("/update/:cartId", cartsController.updateCart);

module.exports = cartsRouter;
