// Import Service
const postsService = require("../services/posts.service.js");

// ---------------------------------------------------------
class PostsController {
  // 1. Get All Posts
  async getAllPosts(req, res) {
    const result = await postsService.getAllPosts();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail Post
  async getDetailPost(req, res) {
    const postId = req.params.postId;
    const result = await postsService.getDetailPost(postId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add Post
  async addPost(req, res) {
    const dataBody = req.body;
    const thumbnail = req.file ? req.file.filename : "";
    const result = await postsService.addPost(dataBody, thumbnail);
    return res.status(result.status).json(result);
  }

  // 4. Delete Post
  async deletePost(req, res) {
    const postId = req.params.postId;
    const result = await postsService.deletePost(postId);
    return res.status(result.status).json(result);
  }

  // 5. Update Post
  async updatePost(req, res) {
    const dataBody = req.body;
    const thumbnail = req.file ? req.file.filename : "";
    const postId = req.params.postId;

    const result = await postsService.updatePost(dataBody, thumbnail, postId);
    return res.status(result.status).json(result);
  }
}
module.exports = new PostsController();
