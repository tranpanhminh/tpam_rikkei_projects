// Import Repo
const productCommentsRepo = require("../repository/productComments.repository.js");

// ---------------------------------------------------------

class ProductCommentsService {
  // 1. Get All Product Comments
  async getAllProductComments() {
    const listProductComments =
      await productCommentsRepo.getAllProductComments();
    if (listProductComments.length === 0) {
      return { data: "No Product Comments", status: 404 };
    } else {
      return { data: listProductComments, status: 200 };
    }
  }

  // 2. Get Detail Product Comment
  async getDetailProductComment(productCommentId) {
    const detailProductComment =
      await productCommentsRepo.getDetailProductComment(productCommentId);

    if (!detailProductComment) {
      return { data: "Product Comment ID Not Found", status: 404 };
    } else {
      return { data: detailProductComment, status: 200 };
    }
  }

  // 3. Add Product Comment
  async addProductComment(productId, userId, dataBody, authHeader) {
    const { comment, rating } = dataBody;
    // Check Login
    if (!authHeader) {
      return { data: "Please login to comment", status: 401 };
    }

    // Check Product
    const findProduct = await productCommentsRepo.findProductById(productId);
    if (!findProduct) {
      return { data: "Product ID Not Found", status: 404 };
    }

    // Check User
    const findUser = await productCommentsRepo.findUserById(userId);

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
        data: "Please rate for the product!",
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
      post_id: productId,
      user_id: userId,
      user_role_id: dataUser.role_id,
    };
    await productCommentsRepo.addProductComment(commentInfo);
    return {
      data: "Comment Successfully",
      status: 200,
    };
  }

  // 4. Delete Product Comment
  async deleteProductComment(productCommentId) {
    const findProductComment = await productCommentsRepo.findProductCommentById(
      productCommentId
    );
    if (!findProductComment) {
      return { data: "Product Comment ID Not Found", status: 404 };
    } else {
      await productCommentsRepo.deleteProductComment(productCommentId);
      return { data: "Product Comment Deleted", status: 200 };
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
module.exports = new ProductCommentsService();
