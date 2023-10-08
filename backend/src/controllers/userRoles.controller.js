const connectMySQL = require("../configs/db.config.js");
const userRolesModel = require("../models/userRoles.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class UserRolesController {
  // 1. Get All User Roles
  async getAllUserRoles(req, res) {
    try {
      const listUserRoles = await userRolesModel.findAll();
      res.status(200).json(listUserRoles);
      console.log(listUserRoles, "listUserRoles");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail User Role
  async getDetailUserRole(req, res) {
    try {
      const userRoleId = req.params.userRoleId;
      const detailUserRole = await userRolesModel.findOne({
        where: { id: userRoleId },
      });
      if (!detailUserRole) {
        return res.status(404).json({ message: "User Role ID Not Found" });
      } else {
        return res.status(200).json(detailUserRole);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add User Role
  async addUserRole(req, res) {
    const { name } = req.body;
    try {
      if (!name) {
        res.status(406).json({ message: "User Role Name must not be blank" });
      } else {
        const userRoleInfo = {
          name: name,
        };
        const newUserRole = await userRolesModel.create(userRoleInfo);
        res.status(200).json({ message: "User Role Added", data: newUserRole });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete User Role
  async deleteUserRole(req, res) {
    try {
      const userRoleId = req.params.userRoleId;
      const findUserRole = await userRolesModel.findOne({
        where: { id: userRoleId },
      });
      if (!findUserRole) {
        return res.status(404).json({ message: "Post Type ID Not Found" });
      } else {
        const deleteUserRole = await userRolesModel.destroy({
          where: { id: userRoleId },
        });
        return res
          .status(200)
          .json({ message: "User Role Deleted", dataDeleted: findUserRole });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update User Role
  async updateUserRole(req, res) {
    const { name } = req.body;
    try {
      const userRoleId = req.params.userRoleId;
      const findUserRole = await userRolesModel.findOne({
        where: { id: userRoleId },
      });

      if (!findUserRole) {
        return res.status(404).json({ message: "Post Type ID Not Found" });
      }

      const dataUserRole = findUserRole.dataValues;

      const userRoleInfo = {
        name: !name ? dataUserRole.name : name,
        updated_at: Date.now(),
      };

      const updatedUserRole = await userRolesModel.update(userRoleInfo, {
        where: { id: userRoleId },
      });
      return res
        .status(200)
        .json({ message: "User Role Updated", dataUpdated: updatedUserRole });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}

module.exports = new UserRolesController();
