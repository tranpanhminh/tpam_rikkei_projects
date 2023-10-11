const postTypesService = require("../services/postTypes.service.js");

// ---------------------------------------------------------
class PostTypesController {
  // 1. Get All
  async getAllPostTypes(req, res) {
    const result = await postTypesService.getAllPostTypes();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail
  async getDetailPostType(req, res) {
    const postTypeId = req.params.postTypeId;
    const result = await postTypesService.getDetailPostType(postTypeId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add
  async addPostType(req, res) {
    const { name } = req.body;
    const result = await postTypesService.addPostType(name);
    return res.status(result.status).json(result.data);
  }

  // 4. Delete
  async deletePostType(req, res) {
    const postTypeId = req.params.postTypeId;
    const result = await postTypesService.deletePostType(postTypeId);
    return res.status(result.status).json(result.data);
  }

  // 5. Update
  async updatePostType(req, res) {
    const { name } = req.body;
    const postTypeId = req.params.postTypeId;
    const result = await postTypesService.updatePostType(name, postTypeId);
    return res.status(result.status).json(result.data);
  }
}

module.exports = new PostTypesController();
