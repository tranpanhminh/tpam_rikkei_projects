// Import Service
const serviceCommentsRepo = require("../repository/serviceComments.repository.js");

// ---------------------------------------------------------

class ServiceCommentsService {
  // 1. Get All Service Comment
  async getAllServiceComments() {
    const listServiceComments =
      await serviceCommentsRepo.getAllServiceComments();
    if (listServiceComments.length === 0) {
      return { data: "No Service Comment", status: 404 };
    } else {
      return { data: listServiceComments, status: 200 };
    }
  }

  // 2. Get Detail Service Comment
  async getDetailServiceComment(serviceCommentId) {
    const detailServiceComment =
      await serviceCommentsRepo.getDetailServiceComment(serviceCommentId);

    if (detailServiceComment.length === 0) {
      return { data: "Service Comment ID Not Found", status: 404 };
    } else {
      return { data: detailServiceComment, status: 200 };
    }
  }

  // 3. Add Service Comment
  async addServiceComment(serviceId, userId, dataBody, authHeader) {
    const { comment, rating } = dataBody;
    // Check Login
    if (!authHeader) {
      return { data: "Please login to comment", status: 401 };
    }

    // Check Service
    const findService = await serviceCommentsRepo.findServiceById(serviceId);
    if (!findService) {
      return { data: "Service ID Not Found", status: 404 };
    }

    // Check User
    const findUser = await serviceCommentsRepo.findUserById(userId);

    if (!findUser) {
      return { data: "User ID Not Found", status: 404 };
    }
    const dataUser = findUser.dataValues;
    if (dataUser.status_id === 2) {
      return {
        data: "You're not allowed to comment because your account is Inactive",
        status: 406,
      };
    }

    if (!comment) {
      return {
        data: "Comment must not be blank",
        status: 406,
      };
    }
    if (!rating) {
      return {
        data: "Please rate for the service!",
        status: 406,
      };
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
      post_id: serviceId,
      user_id: userId,
      user_role_id: dataUser.role_id,
    };
    await serviceCommentsRepo.addServiceComment(commentInfo);
    return {
      data: "Comment Successfully",
      status: 200,
    };
  }

  // 4. Delete Service Comment
  async deleteServiceComment(serviceCommentId) {
    const findServiceComment = await serviceCommentsRepo.findServiceCommentById(
      serviceCommentId
    );
    if (!findServiceComment) {
      return { data: "Service Comment ID Not Found", status: 404 };
    } else {
      await serviceCommentsRepo.deleteServiceComment(serviceCommentId);
      return { data: "Service Comment Deleted", status: 200 };
    }
  }

  // // 5. Update Service Comment
  // async updateProductComment(req, res) {
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
module.exports = new ServiceCommentsService();
