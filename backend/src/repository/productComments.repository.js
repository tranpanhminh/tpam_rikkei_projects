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

  // 3. Add Product Comment
  async addProductComment(commentInfo) {
    const newProductComment = await productCommentsEntity.create(commentInfo);
    return newProductComment;
  }

  // 4. Delete Product Comment
  async deleteProductComment(req, res) {
    try {
      const productCommentId = req.params.productCommentId;
      const findProductComment = await productCommentsEntity.findOne({
        where: { id: productCommentId },
      });
      if (!findProductComment) {
        return res
          .status(404)
          .json({ message: "Product Comment ID Not Found" });
      } else {
        const deleteProductComment = await productCommentsEntity.destroy({
          where: { id: productCommentId },
        });
        return res.status(200).json({
          message: "Product Comment Deleted",
          dataDeleted: findProductComment,
        });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new ProductCommentsRepo();
