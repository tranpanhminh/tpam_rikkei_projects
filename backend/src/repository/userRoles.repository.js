const userRolesEntity = require("../entities/userRoles.entity.js");

// ---------------------------------------------------------
class UserRolesRepo {
  async findUserRoleById(userRoleId) {
    const findUserRole = await userRolesEntity.findOne({
      where: { id: userRoleId },
    });
    return findUserRole;
  }

  // 1. Get All
  async getAllUserRoles() {
    const listUserRoles = await userRolesEntity.findAll();
    return listUserRoles;
  }

  // // 2. Get Detail
  async getDetailUserRole(userRoleId) {
    const findUserRole = await userRolesEntity.findOne({
      where: { id: userRoleId },
    });
    return findUserRole;
  }

  // 3. Add
  async addUserRole(userRoleInfo) {
    const newUserRole = await userRolesEntity.create(userRoleInfo);
    return newUserRole;
  }

  // 4. Delete
  async deleteUserRole(userRoleId) {
    const deleteUserRole = await userRolesEntity.destroy({
      where: { id: userRoleId },
    });
    return deleteUserRole;
  }

  // 5. Update
  async updateUserRole(userRoleInfo, userRoleId) {
    const updateUserRole = await userRolesEntity.update(userRoleInfo, {
      where: { id: userRoleId },
    });
    return updateUserRole;
  }
}

module.exports = new UserRolesRepo();
