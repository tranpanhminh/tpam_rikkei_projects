const connectMySQL = require("../configs/db.config.js");
const postsModel = require("../models/posts.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class PostsController {
  // 1. Get All Posts
  async getAllPosts(req, res) {
    try {
      const listPosts = await postsModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listPosts);
      console.log(listPosts, "listPosts");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Post
  async getDetailPost(req, res) {
    try {
      const postId = req.params.postId;
      const detailPost = await postsModel.findOne({
        where: { id: postId },
      });
      if (!detailPost) {
        return res.status(404).json({ message: "Post ID Not Found" });
      } else {
        return res.status(200).json(detailPost);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Post
  async addPost(req, res) {
    const { title, content, author, status_id } = req.body;
    const thumbnail = req.file ? req.file.filename : "";
    try {
      if (!title) {
        return res
          .status(406)
          .json({ message: "Post Title must not be blank" });
      }
      if (!content) {
        return res.status(406).json({ message: "Content must not be blank" });
      }
      if (!author) {
        return res.status(406).json({
          message: "Author must not be blank",
        });
      }
      if (!status_id) {
        return res.status(406).json({
          message: "Status ID must not be blank",
        });
      }

      const postInfo = {
        title: title,
        content: content,
        thumbnail_url: thumbnail,
        author: author,
        status_id: status_id,
        post_type_id: 3,
      };
      const newPost = await postsModel.create(postInfo);
      res.status(200).json({ message: "Post Added", data: newPost });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Post
  async deletePost(req, res) {
    try {
      const postId = req.params.postId;
      const findPost = await postsModel.findOne({
        where: { id: postId },
      });
      if (!findPost) {
        return res.status(404).json({ message: "Post ID Not Found" });
      } else {
        const deletePost = await postsModel.destroy({
          where: { id: postId },
        });
        return res
          .status(200)
          .json({ message: "Post Deleted", dataDeleted: findPost });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Post
  async updatePost(req, res) {
    const { title, content, thumbnail_url, author, status_id } = req.body;
    const thumbnail = req.file ? req.file.filename : "";
    try {
      const postId = req.params.postId;
      const findPost = await postsModel.findOne({
        where: { id: postId },
      });

      const dataPost = findPost.dataValues;

      const postInfo = {
        title: !title ? dataPost.title : title,
        content: !content ? dataPost.content : content,
        thumbnail_url: !thumbnail ? dataPost.thumbnail_url : thumbnail,
        author: !author ? dataPost.author : author,
        status_id: !status_id ? dataPost.status_id : status_id,
        updated_at: Date.now(),
      };

      const updatedPost = await postsModel.update(postInfo, {
        where: { id: postId },
      });
      return res
        .status(200)
        .json({ message: "Post Updated", dataUpdated: updatedPost });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new PostsController();
