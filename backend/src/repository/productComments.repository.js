const productCommentsEntity = require("../entities/productComments.entity.js");
const productsEntity = require("../entities/products.entity.js");
const usersEntity = require("../entities/users.entity.js");
const postTypesEntity = require("../entities/postTypes.entity.js");

// ---------------------------------------------------------

class ProductCommentsRepo {
  // Find Product By Id
  async findProductById(productId) {
    const findProduct = await productsEntity.findOne({
      where: { id: productId },
    });
    return findProduct;
  }

  // Find Product By Id
  async findUserById(userId) {
    const findUser = await usersEntity.findOne({
      where: { id: userId },
    });
    return findUser;
  }

  // Find Product Comment
  async findProductCommentById(productCommentId) {
    const findProductComment = await productCommentsEntity.findOne({
      where: { id: productCommentId },
    });
    return findProductComment;
  }

  // 1. Get All Product Comments
  async getAllProductComments() {
    // const listProductComments = await productCommentsEntity.findAll();

    const listProductComments = await productCommentsEntity.findAll({
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
    return listProductComments;
  }

  // 2. Get Detail Product Comment
  async getDetailProductComment(productCommentId) {
    // const detailProductComment = await productCommentsEntity.findOne({
    //   where: { id: productCommentId },
    // });

    const detailProductComment = await productCommentsEntity.findAll({
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
      where: { id: productCommentId },
      group: ["id"],
      raw: true,
    });
    return detailProductComment;
  }

  // 3. Get Detail Product Comment By Product ID
  async getDetailProductCommentByProduct(productId) {
    const detailProductComment = await productCommentsEntity.findAll({
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
        {
          model: productsEntity,
          attributes: [],
        },
      ],

      // Nhóm theo id và tên của dịch vụ
      where: { post_id: productId },
    });
    return detailProductComment;
  }

  // 3. Add Product Comment
  async addProductComment(commentInfo) {
    const newProductComment = await productCommentsEntity.create(commentInfo);
    return newProductComment;
  }

  // 4. Delete Product Comment
  async deleteProductComment(productCommentId) {
    const deleteProductComment = await productCommentsEntity.destroy({
      where: { id: productCommentId },
    });
    return deleteProductComment;
  }
}
module.exports = new ProductCommentsRepo();
