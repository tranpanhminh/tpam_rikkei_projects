const express = require("express");

// Import Model
const usersModel = require("../models/users.model.js");

// Import Router
const usersRouter = express.Router();

// Import Controller
const usersController = require("../controllers/users.controller.js");

// ---------------------------------------------------------

// 1. Get All Payments
usersRouter.get("/", usersController.getAllUsers);

// 2. Get Detail Payment
usersRouter.get("/detail/:userId", usersController.getDetailUser);

// 3. Add User
usersRouter.post("/register", usersController.registerUser);

// 4. Add User (Admin)
usersRouter.post("/add", usersController.addUser);

// 4. Delete Payment
usersRouter.delete("/delete/:userId", usersController.deleteUser);

// 5. Update Payment
usersRouter.patch("/update/:userId", usersController.updateUser);

module.exports = usersRouter;
