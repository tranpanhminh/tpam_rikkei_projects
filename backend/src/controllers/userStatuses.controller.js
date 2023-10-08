const connectMySQL = require("../configs/db.config.js");
const userStatusesModel = require("../models/userStatuses.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class UserStatusesController {
  // 1. Get All User Statuses
  async getAllUserStatuses(req, res) {
    try {
      const listUserStatuses = await userStatusesModel.findAll();
      res.status(200).json(listUserStatuses);
      console.log(listUserStatuses, "listUserStatuses");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail User Status
  async getDetailUserStatus(req, res) {
    try {
      const userStatusId = req.params.userStatusId;
      const detailUserStatus = await userStatusesModel.findOne({
        where: { id: userStatusId },
      });
      if (!detailUserStatus) {
        return res.status(404).json({ message: "User Status ID Not Found" });
      } else {
        return res.status(200).json(detailUserStatus);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Order Status
  async addUserStatus(req, res) {
    const { name } = req.body;
    try {
      if (!name) {
        res.status(406).json({ message: "User Status Name must not be blank" });
      } else {
        const userStatusInfo = {
          name: name,
        };
        const newUserStatus = await userStatusesModel.create(userStatusInfo);
        res
          .status(200)
          .json({ message: "User Status Added", data: newUserStatus });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Order Status
  async deleteUserStatus(req, res) {
    try {
      const userStatusId = req.params.userStatusId;
      const findUserStatus = await userStatusesModel.findOne({
        where: { id: userStatusId },
      });
      if (!findUserStatus) {
        return res.status(404).json({ message: "User Status ID Not Found" });
      } else {
        const deleteOrderStatus = await userStatusesModel.destroy({
          where: { id: userStatusId },
        });
        return res.status(200).json({
          message: "Order Status Deleted",
          dataDeleted: findUserStatus,
        });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Order Status
  async updateUserStatus(req, res) {
    const { name } = req.body;
    try {
      const userStatusId = req.params.userStatusId;
      const findUserStatus = await userStatusesModel.findOne({
        where: { id: userStatusId },
      });

      if (!findUserStatus) {
        return res.status(404).json({ message: "User Status ID Not Found" });
      }

      const dataUserStatus = findUserStatus.dataValues;

      const userStatusInfo = {
        name: !name ? dataUserStatus.name : name,
        updated_at: Date.now(),
      };

      const updatedUserStatus = await userStatusesModel.update(userStatusInfo, {
        where: { id: userStatusId },
      });
      return res.status(200).json({
        message: "User Status Updated",
        dataUpdated: updatedUserStatus,
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}

module.exports = new UserStatusesController();
