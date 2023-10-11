// Import Service
const productCommentsService = require("../services/productComments.service.js");

// ---------------------------------------------------------
class ProductCommentsController {
  // 1. Get All Product Comments
  async getAllProductComments(req, res) {
    const result = await productCommentsService.getAllProductComments();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail Product Comment
  async getDetailProductComment(req, res) {
    const productCommentId = req.params.productCommentId;
    const result = await productCommentsService.getDetailProductComment(
      productCommentId
    );
    return res.status(result.status).json(result.data);
  }

  // 3. Add Product Comment
  async addProductComment(req, res) {
    const productId = req.params.productId;
    const userId = req.params.userId;
    const dataBody = req.body;
    const authHeader = req.header("Authorization");
    const result = await productCommentsService.addProductComment(
      productId,
      userId,
      dataBody,
      authHeader
    );
    return res.status(result.status).json(result.data);
  }

  // 4. Delete Product Comment
  async deleteProductComment(req, res) {
    const productCommentId = req.params.productCommentId;
    const result = await productCommentsService.deleteProductComment(
      productCommentId
    );
    return res.status(result.status).json(result.data);
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
