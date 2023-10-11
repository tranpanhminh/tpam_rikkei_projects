const userRolesService = require("../services/userRoles.service.js");

// ---------------------------------------------------------
class UserRolesController {
  // 1. Get All
  async getAllUserRoles(req, res) {
    const result = await userRolesService.getAllUserRoles();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail
  async getDetailUserRole(req, res) {
    const userRoleId = req.params.userRoleId;
    const result = await userRolesService.getDetailUserRole(userRoleId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add
  async addUserRole(req, res) {
    const { name } = req.body;
    const result = await userRolesService.addUserRole(name);
    return res.status(result.status).json(result.data);
  }

  // 4. Delete
  async deleteUserRole(req, res) {
    const userRoleId = req.params.userRoleId;
    const result = await userRolesService.deleteUserRole(userRoleId);
    return res.status(result.status).json(result.data);
  }

  // 5. Update
  async updateUserRole(req, res) {
    const { name } = req.body;
    const userRoleId = req.params.userRoleId;
    const result = await userRolesService.updateUserRole(name, userRoleId);
    return res.status(result.status).json(result.data);
  }
}

module.exports = new UserRolesController();
