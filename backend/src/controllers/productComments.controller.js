const connectMySQL = require("../configs/db.config.js");
const productCommentsModel = require("../models/productComments.model.js");
const bcrypt = require("bcryptjs");
const productsModel = require("../models/products.model.js");
const usersModel = require("../models/users.model.js");
const postTypesModel = require("../models/postTypes.model.js");

// ---------------------------------------------------------
class ProductCommentsController {
  // 1. Get All Product Comments
  async getAllProductComments(req, res) {
    try {
      // const listProductComments = await productCommentsModel.findAll();

      const listProductComments = await productCommentsModel.findAll({
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
            model: usersModel,
            attributes: ["full_name", "role_id"],
          },
          {
            model: postTypesModel,
            attributes: ["name"],
          },
        ],

        // Nhóm theo id và tên của dịch vụ
        group: ["id"],
        raw: true,
      });
      res.status(200).json(listProductComments);
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Product Comment
  async getDetailProductComment(req, res) {
    try {
      const productCommentId = req.params.productCommentId;
      const detailProductComment = await productCommentsModel.findOne({
        where: { id: productCommentId },
      });
      if (!detailProductComment) {
        return res
          .status(404)
          .json({ message: "Product Comment ID Not Found" });
      } else {
        return res.status(200).json(detailProductComment);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
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
      const findProduct = await productsModel.findOne({
        where: {
          id: productId,
        },
      });
      if (!findProduct) {
        return res.status(404).json({ message: "Product ID Not Found" });
      }

      // Check User
      const findUser = await usersModel.findOne({
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
      const newProductComment = await productCommentsModel.create(commentInfo);
      res.status(200).json(newProductComment);
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Product Comment
  async deleteProductComment(req, res) {
    try {
      const productCommentId = req.params.productCommentId;
      const findProductComment = await productCommentsModel.findOne({
        where: { id: productCommentId },
      });
      if (!findProductComment) {
        return res
          .status(404)
          .json({ message: "Product Comment ID Not Found" });
      } else {
        const deleteProductComment = await productCommentsModel.destroy({
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

  // // 5. Update Product Comment
  // async updateProductComment(req, res) {
  //   const { name, code, discount_rate, min_bill } = req.body;
  //   try {
  //     const productCommentId = req.params.productCommentId;
  //     const findCoupon = await productComments.findOne({
  //       where: { id: productCommentId },
  //     });
  //     if (!findCoupon) {
  //       return res.status(404).json({ message: "Coupon ID Not Found" });
  //     }
  //     const dataCoupon = findCoupon.dataValues;

  //     if (discount_rate < 0) {
  //       return res.status(406).json({
  //         message: "Discount rate must > 0",
  //       });
  //     }
  //     if (min_bill < 0) {
  //       return res.status(406).json({
  //         message: "Min Bill must > 0",
  //       });
  //     }

  //     const couponInfo = {
  //       name: !name ? dataCoupon.name : name,
  //       code: !code ? dataCoupon.code : code,
  //       discount_rate: !discount_rate
  //         ? dataCoupon.discount_rate
  //         : discount_rate,
  //       min_bill: !min_bill ? dataCoupon.min_bill : min_bill,
  //       updated_at: Date.now(),
  //     };

  //     const updatedCoupon = await productComments.update(couponInfo, {
  //       where: { id: productCommentId },
  //     });
  //     return res
  //       .status(200)
  //       .json({ message: "Coupon Updated", dateUpdated: updatedCoupon });
  //   } catch (error) {
  //     console.log(error, "ERROR");
  //   }
  // }
}
module.exports = new ProductCommentsController();