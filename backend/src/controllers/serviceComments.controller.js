// Import Service
const serviceCommentsService = require("../services/serviceComments.service.js");

// ---------------------------------------------------------
class ServiceCommentsController {
  // 1. Get All Service Comments
  async getAllServiceComments(req, res) {
    const result = await serviceCommentsService.getAllServiceComments();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail Service Comment
  async getDetailServiceComment(req, res) {
    const serviceCommentId = req.params.serviceCommentId;
    const result = await serviceCommentsService.getDetailServiceComment(
      serviceCommentId
    );
    return res.status(result.status).json(result.data);
  }

  // 3. Get Detail Service Comment By Service
  async getDetailServiceCommentByService(req, res) {
    const serviceId = req.params.serviceId;
    const result =
      await serviceCommentsService.getDetailServiceCommentByService(serviceId);
    return res.status(result.status).json(result.data);
  }

  // 4. Add Service Comment
  async addServiceComment(req, res) {
    const serviceId = req.params.serviceId;
    const userId = req.params.userId;
    const dataBody = req.body;
    // const authHeader = req.header("Authorization");
    const result = await serviceCommentsService.addServiceComment(
      serviceId,
      userId,
      dataBody
      // authHeader
    );
    return res.status(result.status).json(result.message);
  }

  // 5. Delete Service Comment
  async deleteServiceComment(req, res) {
    const serviceCommentId = req.params.serviceCommentId;
    const result = await serviceCommentsService.deleteServiceComment(
      serviceCommentId
    );
    return res.status(result.status).json(result);
  }
}
module.exports = new ServiceCommentsController();
