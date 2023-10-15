const userStatusesService = require("../services/userStatuses.service.js");

// ---------------------------------------------------------
class UserStatusesController {
  // 1. Get All
  async getAllUserStatuses(req, res) {
    const result = await userStatusesService.getAllUserStatuses();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail
  async getDetailUserStatus(req, res) {
    const userStatusId = req.params.userStatusId;
    const result = await userStatusesService.getDetailUserStatus(userStatusId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add
  async addUserStatus(req, res) {
    const { name } = req.body;
    const result = await userStatusesService.addUserStatus(name);
    return res.status(result.status).json(result);
  }

  // 4. Delete
  async deleteUserStatus(req, res) {
    const userStatusId = req.params.userStatusId;
    const result = await userStatusesService.deleteUserStatus(userStatusId);
    return res.status(result.status).json(result);
  }

  // 5. Update
  async updateUserStatus(req, res) {
    const { name } = req.body;
    const userStatusId = req.params.userStatusId;
    const result = await userStatusesService.updateUserStatus(
      name,
      userStatusId
    );
    return res.status(result.status).json(result);
  }
}

module.exports = new UserStatusesController();
