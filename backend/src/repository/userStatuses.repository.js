const userStatusesEntity = require("../entities/userStatuses.entity.js");

// ---------------------------------------------------------
class UserStatusesRepo {
  async findUserStatusById(userStatusId) {
    const findUserStatus = await userStatusesEntity.findOne({
      where: { id: userStatusId },
    });
    return findUserStatus;
  }

  // 1. Get All
  async getAllUserStatuses() {
    const listUserStatuses = await userStatusesEntity.findAll();
    return listUserStatuses;
  }

  // // 2. Get Detail
  async getDetailUserStatus(userStatusId) {
    const findUserStatus = await userStatusesEntity.findOne({
      where: { id: userStatusId },
    });
    return findUserStatus;
  }

  // 3. Add
  async addUserStatus(userStatusInfo) {
    const newUserStatus = await userStatusesEntity.create(userStatusInfo);
    return newUserStatus;
  }

  // 4. Delete
  async deleteUserStatus(userStatusId) {
    const deleteUserStatus = await userStatusesEntity.destroy({
      where: { id: userStatusId },
    });
    return deleteUserStatus;
  }

  // 5. Update
  async updateUserStatus(userStatusInfo, userStatusId) {
    const updateUserStatus = await userStatusesEntity.update(userStatusInfo, {
      where: { id: userStatusId },
    });
    return updateUserStatus;
  }
}

module.exports = new UserStatusesRepo();
