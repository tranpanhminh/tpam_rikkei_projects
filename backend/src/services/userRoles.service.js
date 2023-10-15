const userRolesRepo = require("../repository/userRoles.repository.js");

// ---------------------------------------------------------
class UserRolesService {
  // 1. Get All
  async getAllUserRoles() {
    const listUserRoles = await userRolesRepo.getAllUserRoles();
    if (listUserRoles.length === 0) {
      return { data: [], status: 404 };
    } else {
      return { data: listUserRoles, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailUserRole(userRoleId) {
    const detailUserRole = await userRolesRepo.getDetailUserRole(userRoleId);
    if (!detailUserRole) {
      return { data: {}, status: 404 };
    } else {
      return { data: detailUserRole, status: 200 };
    }
  }

  // 3. Add
  async addUserRole(name) {
    if (!name) {
      return { message: "UserRole Name must not be blank", status: 406 };
    } else {
      const userRoleInfo = {
        name: name,
      };
      await userRolesRepo.addUserRole(userRoleInfo);
      return { message: "UserRole Added", status: 200 };
    }
  }

  // 4. Delete
  async deleteUserRole(userRoleId) {
    const findUserRole = await userRolesRepo.findUserRoleById(userRoleId);
    if (!findUserRole) {
      return { message: "UserRole ID Not Found", status: 404 };
    } else {
      await userRolesRepo.deleteUserRole(userRoleId);
      return { message: "UserRole Deleted", status: 200 };
    }
  }

  // 5. Update
  async updateUserRole(name, userRoleId) {
    const findUserRole = await userRolesRepo.findUserRoleById(userRoleId);
    if (!findUserRole) {
      return { message: "UserRole ID Not Found", status: 404 };
    }

    const dataUserRole = findUserRole.dataValues;

    const userRoleInfo = {
      name: !name ? dataUserRole.name : name,
      updated_at: Date.now(),
    };

    await userRolesRepo.updateUserRole(userRoleInfo, userRoleId);
    return { message: "UserRole Role Updated", status: 200 };
  }
}

module.exports = new UserRolesService();
