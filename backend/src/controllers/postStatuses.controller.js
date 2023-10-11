const postStatusesService = require("../services/postStatuses.service.js");

// ---------------------------------------------------------
class PostStatusesController {
  // 1. Get All
  async getAllPostStatuses(req, res) {
    const result = await postStatusesService.getAllPostStatuses();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail
  async getDetailPostStatus(req, res) {
    const postStatusId = req.params.postStatusId;
    const result = await postStatusesService.getDetailPostStatus(postStatusId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add
  async addPostStatus(req, res) {
    const { name } = req.body;
    const result = await postStatusesService.addPostStatus(name);
    return res.status(result.status).json(result.data);
  }

  // 4. Delete
  async deletePostStatus(req, res) {
    const postStatusId = req.params.postStatusId;
    const result = await postStatusesService.deletePostStatus(postStatusId);
    return res.status(result.status).json(result.data);
  }

  // 5. Update
  async updatePostStatus(req, res) {
    const { name } = req.body;
    const postStatusId = req.params.postStatusId;
    const result = await postStatusesService.updatePostStatus(
      name,
      postStatusId
    );
    return res.status(result.status).json(result.data);
  }
}

module.exports = new PostStatusesController();
