const connectMySQL = require("../configs/db.config.js");
const serviceCommentsModel = require("../models/serviceComments.model.js");
const bcrypt = require("bcryptjs");
const servicesModel = require("../models/services.model.js");
const usersModel = require("../models/users.model.js");
const postTypesModel = require("../models/postTypes.model.js");

// ---------------------------------------------------------
class ServiceCommentsController {
  // 1. Get All Service Comments
  async getAllServiceComments(req, res) {
    try {
      // const listServiceComments = await serviceCommentsModel.findAll();

      const listServiceComments = await serviceCommentsModel.findAll({
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
      res.status(200).json(listServiceComments);
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2.Get Detail Service Comment
  async getDetailServiceComment(req, res) {
    try {
      const serviceCommentId = req.params.serviceCommentId;
      const detailServiceComment = await serviceCommentsModel.findOne({
        where: { id: serviceCommentId },
      });
      if (!detailServiceComment) {
        return res
          .status(404)
          .json({ message: "Service Comment ID Not Found" });
      } else {
        return res.status(200).json(detailServiceComment);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Service Comment
  async addServiceComment(req, res) {
    const serviceId = req.params.serviceId;
    const userId = req.params.userId;
    const { comment, rating } = req.body;

    try {
      // Check Login
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        res.status(401).json({ message: "Please login to comment" });
      }

      // Check Servuce
      const findService = await servicesModel.findOne({
        where: {
          id: serviceId,
        },
      });
      if (!findService) {
        return res.status(404).json({ message: "Service ID Not Found" });
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
          .json({ message: "Please rate for the service!" });
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
        post_type_id: 2,
        post_id: serviceId,
        user_id: userId,
        user_role_id: dataUser.role_id,
      };
      const newServiceComment = await serviceCommentsModel.create(commentInfo);
      res.status(200).json(newServiceComment);
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Service Comment
  async deleteServiceComment(req, res) {
    try {
      const serviceCommentId = req.params.serviceCommentId;
      const findServiceComment = await serviceCommentsModel.findOne({
        where: { id: serviceCommentId },
      });
      if (!findServiceComment) {
        return res
          .status(404)
          .json({ message: "Service Comment ID Not Found" });
      } else {
        const deleteServiceComment = await serviceCommentsModel.destroy({
          where: { id: serviceCommentId },
        });
        return res.status(200).json({
          message: "Service Comment Deleted",
          dataDeleted: findServiceComment,
        });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // // 5. Update Service Comment
  // async updateServiceComment(req, res) {
  //   const { name, code, discount_rate, min_bill } = req.body;
  //   try {
  //     const serviceCommentId = req.params.serviceCommentId;
  //     const findCoupon = await productComments.findOne({
  //       where: { id: serviceCommentId },
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
  //       where: { id: serviceCommentId },
  //     });
  //     return res
  //       .status(200)
  //       .json({ message: "Coupon Updated", dateUpdated: updatedCoupon });
  //   } catch (error) {
  //     console.log(error, "ERROR");
  //   }
  // }
}
module.exports = new ServiceCommentsController();
