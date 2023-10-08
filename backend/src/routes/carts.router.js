const express = require("express");

// Import Model
const cartsModel = require("../models/carts.model.js");

// Import Router
const cartsRouter = express.Router();

// Import Controller
const cartsController = require("../controllers/carts.controller.js");

// ---------------------------------------------------------

// 1. Get All Carts
cartsRouter.get("/", cartsController.getAllCarts);

// 2. Get Detail Cart
cartsRouter.get("/detail/:cartId", cartsController.getDetailCart);

// 3. Add Cart
cartsRouter.post("/add", cartsController.addCart);

// 4. Delete Cart
cartsRouter.delete("/delete/:cartId", cartsController.deleteCart);

// // 5. Update Cart
cartsRouter.patch("/update/:cartId", cartsController.updateCart);

module.exports = cartsRouter;
