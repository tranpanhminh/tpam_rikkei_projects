const connectMySQL = require("../configs/db.config.js");
const postsEntity = require("../entities/posts.entity.js");
const postTypesEntity = require("../entities/postTypes.entity.js");
const postStatusesEntity = require("../entities/postStatuses.entity.js");
const bcrypt = require("bcryptjs");
const sourceImage = process.env.BASE_URL_IMAGE;

// ---------------------------------------------------------
class PostsRepo {
  // FindPostById
  async findPostById(postId) {
    const findPost = await postsEntity.findOne({
      where: { id: postId },
    });
    return findPost;
  }
  // 1. Get All Posts
  async getAllPosts() {
    const listPosts = await postsEntity.findAll({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "title",
        "content",
        "thumbnail_url",
        "author",
        "post_type_id",
        "status_id",
        "created_at",
        "updated_at",
      ],
      // Tham gia với bảng post_types
      include: [
        {
          model: postTypesEntity,
          attributes: ["name"],
        },
        {
          model: postStatusesEntity,
          attributes: ["name"],
        },
      ],

      // Nhóm theo id và tên của dịch vụ
      group: ["id"],
      // raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });
    return listPosts;
  }

  // 2. Get Detail Post
  async getDetailPost(postId) {
    const detailPost = await postsEntity.findOne({
      // Chọn các thuộc tính cần thiết
      attributes: [
        "id",
        "title",
        "content",
        "thumbnail_url",
        "author",
        "post_type_id",
        "status_id",
        "created_at",
        "updated_at",
      ],
      // Tham gia với bảng post_types
      include: [
        {
          model: postTypesEntity,
          attributes: ["name"],
        },
        {
          model: postStatusesEntity,
          attributes: ["name"],
        },
      ],

      // Nhóm theo id và tên của dịch vụ
      where: { id: postId },
      group: ["id"],
      // raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });

    return detailPost;
  }

  // 3. Add Post
  async addPost(postInfo) {
    const newPost = await postsEntity.create(postInfo);
    return newPost;
  }

  // 4. Delete Post
  async deletePost(postId) {
    const deletePost = await postsEntity.destroy({
      where: { id: postId },
    });
    return deletePost;
  }

  // 5. Update Post
  async updatePost(postInfo, postId) {
    const updatedPost = await postsEntity.update(postInfo, {
      where: { id: postId },
    });
    return updatedPost;
  }
}

module.exports = new PostsRepo();
