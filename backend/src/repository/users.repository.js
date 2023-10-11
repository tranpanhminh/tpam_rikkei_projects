const userRolesEntity = require("../entities/userRoles.entity.js");
const userStatusesEntity = require("../entities/userStatuses.entity.js");
const usersEntity = require("../entities/users.entity.js");

class UsersRepo {
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
}

module.exports = new UsersRepo();
