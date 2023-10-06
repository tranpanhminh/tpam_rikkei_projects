const express = require("express");

// Import Model
const usersModel = require("../models/users.model.js");

// Import Router
const usersRouter = express.Router();

// Import Controller
const usersController = require("../controllers/users.controller.js");

// Import MiddleWare
const upload = require("../middlewares/uploadFiles.js");

// ---------------------------------------------------------

// // 1. Get All Users
usersRouter.get("/", usersController.getAllUsers);

// 2. Get Detail User
usersRouter.get("/detail/:userId", usersController.getDetailUser);

// 3. Register User
usersRouter.post("/register", usersController.registerUser);

// 4. Add User (Admin)
usersRouter.post("/add", usersController.addUser);

// 5. Create User (Manual Thêm bất kỳ User)
usersRouter.post("/create", usersController.createUser);

// 6. Delete User
usersRouter.delete("/delete/:userId", usersController.deleteUser);

// 7. Update User
usersRouter.patch("/update/:userId", usersController.updateUser);

// 8. Edit Password
usersRouter.patch("/change-password/:userId", usersController.changePassword);

// 9. Edit User Status
usersRouter.patch(
  "/change-status-account/:userId",
  usersController.changeStatus
);

// 10. Edit Avatar
usersRouter.patch(
  "/edit-avatar/:userId",
  upload.single("image_avatar"),
  usersController.editAvatar
);

module.exports = usersRouter;
