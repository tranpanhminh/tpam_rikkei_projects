const userRolesEntity = require("../entities/userRoles.entity.js");
const userStatusesEntity = require("../entities/userStatuses.entity.js");
const usersEntity = require("../entities/users.entity.js");

class UsersRepo {
  // Dùng chung
  async findOneByEmail(email) {
    const findEmail = await usersEntity.findOne({ where: { email: email } });
    return findEmail;
  }

  async findOneById(userId) {
    const findUser = await usersEntity.findOne({ where: { id: userId } });
    return findUser;
  }

  // 1. Get All Users
  async getAllUsers() {
    const listUsers = await usersEntity.findAll({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "email",
        "full_name",
        "status_id",
        "role_id",
        "image_avatar",
        "created_at",
        "updated_at",
      ],

      // Tham gia với bảng post_types
      include: [
        {
          model: userRolesEntity,
          attributes: ["name"],
        },
        {
          model: userStatusesEntity,
          attributes: ["name"],
        },
      ],

      // Nhóm theo id và tên của dịch vụ
      group: ["users.id"],
      // raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });

    return listUsers;
  }

  // 2. Get Detail User
  async getDetailUser(userId) {
    const detailUser = await usersEntity.findOne({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "email",
        "full_name",
        "status_id",
        "role_id",
        "image_avatar",
        "created_at",
        "updated_at",
      ],

      // Tham gia với bảng post_types
      include: [
        {
          model: userRolesEntity,
          attributes: ["name"],
        },
        {
          model: userStatusesEntity,
          attributes: ["name"],
        },
      ],
      where: {
        id: userId,
      },
      // Nhóm theo id và tên của dịch vụ
      group: ["users.id"],
      // raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });
    return detailUser;
  }

  // 3. Register User (Customer)
  async userRegister(data) {
    const newUser = await usersEntity.create(data);
    return newUser;
  }

  // 4. Add User (By Admin)
  async addAdmin(data) {
    const newAdmin = await usersEntity.create(data);
    return newAdmin;
  }

  // 5. Add User (Optional)
  async createUser(email) {
    const findEmail = await usersEntity.findOne({ where: { email: email } });
    return findEmail;
  }

  // 6. Delete User
  async deleteUser(userId) {
    const deleteUser = await usersEntity.destroy({
      where: { id: userId },
    });
    return deleteUser;
  }

  // 7.Change Password
  async changePassword(userId, updatedInfo) {
    const updatedUser = await usersEntity.update(updatedInfo, {
      where: { id: userId },
    });
    return updatedUser;
  }

  // 8. Change Status
  async changeStatus(updatedUser, userId) {
    const updatedAvatar = await usersEntity.update(updatedUser, {
      where: { id: userId },
    });
    return updatedAvatar;
  }

  // 9.Edit Avatar
  async editAvatar(userId, updatedUser) {
    const updatedAvatar = await usersEntity.update(updatedUser, {
      where: { id: userId },
    });
    return updatedAvatar;
  }

  // 10. Create User (Optional)
  async createUser(data) {
    const newAdmin = await usersEntity.create(data);
    return newAdmin;
  }

  // 11. Update User
  async updateUser(userInfo, userId) {
    const updatedUser = await usersEntity.update(userInfo, {
      where: { id: userId },
    });
    return updatedUser;
  }
}

module.exports = new UsersRepo();
