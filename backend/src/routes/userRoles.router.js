const express = require("express");

// Import Router
const userRolesRouter = express.Router();

// Import Controller
const userRolesController = require("../controllers/userRoles.controller.js");

// ---------------------------------------------------------

// 1. Get All User Roles
userRolesRouter.get("/", userRolesController.getAllUserRoles);

// 2. Get Detail User Role
userRolesRouter.get(
  "/detail/:userRoleId",
  userRolesController.getDetailUserRole
);

// 3. Add User Role
userRolesRouter.post("/add", userRolesController.addUserRole);

// 4. Delete User Role
userRolesRouter.delete(
  "/delete/:userRoleId",
  userRolesController.deleteUserRole
);

// // 5. Update User Role
userRolesRouter.patch(
  "/update/:userRoleId",
  userRolesController.updateUserRole
);

module.exports = userRolesRouter;
