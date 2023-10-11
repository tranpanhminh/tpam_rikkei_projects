const userStatusesRepo = require("../repository/userStatuses.repository.js");

// ---------------------------------------------------------
class UserStatusesService {
  // 1. Get All
  async getAllUserStatuses() {
    const listUserStatuses = await userStatusesRepo.getAllUserStatuses();
    if (listUserStatuses.length === 0) {
      return { data: "No UserStatus Found", status: 404 };
    } else {
      return { data: listUserStatuses, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailUserStatus(userStatusId) {
    const detailUserStatus = await userStatusesRepo.getDetailUserStatus(
      userStatusId
    );
    if (!detailUserStatus) {
      return { data: "UserStatus ID Not Found", status: 404 };
    } else {
      return { data: detailUserStatus, status: 200 };
    }
  }

  // 3. Add
  async addUserStatus(name) {
    if (!name) {
      return { data: "UserStatus Name must not be blank", status: 406 };
    } else {
      const userStatusInfo = {
        name: name,
      };
      await userStatusesRepo.addUserStatus(userStatusInfo);
      return { data: "UserStatus Added", status: 200 };
    }
  }

  // 4. Delete
  async deleteUserStatus(userStatusId) {
    const findUserStatus = await userStatusesRepo.findUserStatusById(
      userStatusId
    );
    if (!findUserStatus) {
      return { data: "UserStatus ID Not Found", status: 404 };
    } else {
      await userStatusesRepo.deleteUserStatus(userStatusId);
      return { data: "UserStatus Deleted", status: 200 };
    }
  }

  // 5. Update
  async updateUserStatus(name, userStatusId) {
    const findUserStatus = await userStatusesRepo.findUserStatusById(
      userStatusId
    );
    if (!findUserStatus) {
      return { data: "UserStatus ID Not Found", status: 404 };
    }

    const dataUserStatus = findUserStatus.dataValues;

    const userStatusInfo = {
      name: !name ? dataUserStatus.name : name,
      updated_at: Date.now(),
    };

    await userStatusesRepo.updateUserStatus(userStatusInfo, userStatusId);
    return { data: "UserStatus Status Updated", status: 200 };
  }
}

module.exports = new UserStatusesService();
