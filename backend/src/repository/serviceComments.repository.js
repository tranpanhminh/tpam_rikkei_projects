const serviceCommentsEntity = require("../entities/serviceComments.entity.js");
const servicesEntity = require("../entities/services.entity.js");
const usersEntity = require("../entities/users.entity.js");
const postTypesEntity = require("../entities/postTypes.entity.js");

// ---------------------------------------------------------

class ServiceCommentsRepo {
  // Find Service By Id
  async findServiceById(serviceId) {
    const findService = await servicesEntity.findOne({
      where: { id: serviceId },
    });
    return findService;
  }

  // Find Service By Id
  async findUserById(userId) {
    const findUser = await usersEntity.findOne({
      where: { id: userId },
    });
    return findUser;
  }

  // Find Service Comment
  async findServiceCommentById(serviceCommentId) {
    const findProductComment = await serviceCommentsEntity.findOne({
      where: { id: serviceCommentId },
    });
    return findProductComment;
  }

  // 1. Get All Service Comments
  async getAllServiceComments() {
    // const listServiceComments = await serviceCommentsEntity.findAll();

    const listServiceComments = await serviceCommentsEntity.findAll({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "comment",
        "rating",
        "post_type_id",
        "post_id",
        "user_id",
        "user_role_id",
        "created_at",
        "updated_at",
      ],

      // Tham gia với bảng post_types
      include: [
        {
          model: usersEntity,
          attributes: ["full_name", "role_id", "image_avatar"],
        },
        {
          model: postTypesEntity,
          attributes: ["name"],
        },
      ],

      // Nhóm theo id và tên của dịch vụ
      group: ["id"],
      raw: true,
    });
    return listServiceComments;
  }

  // 2. Get Detail Service Comment
  async getDetailServiceComment(serviceCommentId) {
    // const detailServiceComment = await serviceCommentsEntity.findOne({
    //   where: { id: serviceCommentId },
    // });

    const detailServiceComment = await serviceCommentsEntity.findAll({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "comment",
        "rating",
        "post_type_id",
        "post_id",
        "user_id",
        "user_role_id",
        "created_at",
        "updated_at",
      ],

      // Tham gia với bảng post_types
      include: [
        {
          model: usersEntity,
          attributes: ["full_name", "role_id", "image_avatar"],
        },
        {
          model: postTypesEntity,
          attributes: ["name"],
        },
      ],

      // Nhóm theo id và tên của dịch vụ
      where: { id: serviceCommentId },
      group: ["id"],
      raw: true,
    });
    return detailServiceComment;
  }

  // 3. Add Service Comment
  async addServiceComment(commentInfo) {
    const newProductComment = await serviceCommentsEntity.create(commentInfo);
    return newProductComment;
  }

  // 4. Delete Service Comment
  async deleteServiceComment(serviceCommentId) {
    const deleteProductComment = await serviceCommentsEntity.destroy({
      where: { id: serviceCommentId },
    });
    return deleteProductComment;
  }
}
module.exports = new ServiceCommentsRepo();
