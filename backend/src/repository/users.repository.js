const userRolesEntity = require("../entities/userRoles.entity.js");
const userStatusesEntity = require("../entities/userStatuses.entity.js");
const usersEntity = require("../entities/users.entity.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UsersRepo {
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
      raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });

    return listUsers;
  }

  // 2. Get Detail User
  async getDetailUser(userId) {
    const detailUser = await usersEntity.findAll({
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
      raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });

    return detailUser;
  }

  // 3. Register User (Customer)
  async userRegister(email) {
    const findEmail = await usersEntity.findOne({ where: { email: email } });
    return findEmail;
  }

  // 4. Add User (By Admin)
  async findOneByEmail(email) {
    const findEmail = await usersEntity.findOne({ where: { email: email } });
    return findEmail;
  }

  async addUser(data) {
    const newUser = await usersEntity.create(data);
    return newUser;
  }

  // 5. Add User (Optional)
  async createUser(email) {
    const findEmail = await usersEntity.findOne({ where: { email: email } });
    return findEmail;
  }
}

module.exports = new UsersRepo();
