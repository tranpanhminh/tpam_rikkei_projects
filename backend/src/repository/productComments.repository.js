const productCommentsEntity = require("../entities/productComments.entity.js");
const productsEntity = require("../entities/products.entity.js");
const usersEntity = require("../entities/users.entity.js");
const postTypesEntity = require("../entities/postTypes.entity.js");

// ---------------------------------------------------------

class ProductCommentsRepo {
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
          attributes: ["full_name", "role_id"],
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
    const detailProductComment = await productCommentsEntity.findOne({
      where: { id: productCommentId },
    });
    return detailProductComment;
  }

  // 3. Add Product Comment
  async addProductComment(req, res) {
    const productId = req.params.productId;
    const userId = req.params.userId;
    const { comment, rating } = req.body;

    try {
      // Check Login
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        res.status(401).json({ message: "Please login to comment" });
      }

      // Check Product
      const findProduct = await productsEntity.findOne({
        where: {
          id: productId,
        },
      });
      if (!findProduct) {
        return res.status(404).json({ message: "Product ID Not Found" });
      }

      // Check User
      const findUser = await usersEntity.findOne({
        where: {
          id: userId,
        },
      });

      if (!findUser) {
        return res.status(404).json({ message: "User ID Not Found" });
      }
      const dataUser = findUser.dataValues;
      if (dataUser.status_id === 2) {
        return res.status(406).json({
          message:
            "You're not allowed to comment because your account is Inactive",
        });
      }

      if (!comment) {
        return res.status(406).json({ message: "Comment must not be blank" });
      }
      if (!rating) {
        return res
          .status(406)
          .json({ message: "Please rate for the product!" });
      }

      /** 
          User Status:
          1. Active
          2. Inactive
  
          Role:
          1. Super Admin
          2. Admin
          3. Customer
  
          Post Types:
          1. Product
          2. Service
          3. Post
          4. Page
          */

      const commentInfo = {
        comment: comment,
        rating: dataUser.role_id === 1 || dataUser.role_id === 2 ? 5 : rating,
        post_type_id: 1,
        post_id: productId,
        user_id: userId,
        user_role_id: dataUser.role_id,
      };
      const newProductComment = await productCommentsEntity.create(commentInfo);
      res.status(200).json(newProductComment);
    } catch (error) {
      console.log(error, "ERROR");
    }
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
