// Import Service
const postsRepo = require("../repository/posts.repository.js");

// ---------------------------------------------------------
class PostsService {
  // 1. Get All Posts
  async getAllPosts() {
    const listPosts = await postsRepo.getAllPosts();
    if (listPosts.length === 0) {
      return { data: "No Data Posts", status: 404 };
    } else {
      return { data: listPosts, status: 200 };
    }
  }

  // 2. Get Detail Post
  async getDetailPost(postId) {
    const detailPost = await postsRepo.getDetailPost(postId);

    if (detailPost.length === 0) {
      return { data: "Post ID Not Found", status: 404 };
    } else {
      return { data: detailPost, status: 200 };
    }
  }

  // 3. Add Post
  async addPost(req, res) {
    const { title, content, author, status_id } = req.body;
    const thumbnail = req.file ? req.file.filename : "";

    if (!title) {
      return res.status(406).json({ message: "Post Title must not be blank" });
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

    if (!req.file && status_id == 2) {
      return res.status(406).json({
        message: "You can't set to Published until you set thumbnail",
      });
    }

    const postInfo = {
      title: title,
      content: content,
      thumbnail_url: sourceImage + thumbnail,
      author: author,
      status_id: status_id,
      post_type_id: 3,
    };
    const newPost = await postsRepo.create(postInfo);
    res.status(200).json({ message: "Post Added", data: newPost });
  }

  // 4. Delete Post
  async deletePost(req, res) {
    const postId = req.params.postId;
    const findPost = await postsRepo.findOne({
      where: { id: postId },
    });
    if (!findPost) {
      return res.status(404).json({ message: "Post ID Not Found" });
    } else {
      const deletePost = await postsRepo.destroy({
        where: { id: postId },
      });
      return res
        .status(200)
        .json({ message: "Post Deleted", dataDeleted: findPost });
    }
  }

  // 5. Update Post
  async updatePost(req, res) {
    const { title, content, thumbnail_url, author, status_id } = req.body;
    const thumbnail = req.file ? req.file.filename : "";

    const postId = req.params.postId;
    const findPost = await postsRepo.findOne({
      where: { id: postId },
    });

    const dataPost = findPost.dataValues;

    const postInfo = {
      title: !title ? dataPost.title : title,
      content: !content ? dataPost.content : content,
      thumbnail_url: !thumbnail
        ? dataPost.thumbnail_url
        : sourceImage + thumbnail,
      author: !author ? dataPost.author : author,
      status_id: !status_id ? dataPost.status_id : status_id,
      updated_at: Date.now(),
    };

    const updatedPost = await postsRepo.update(postInfo, {
      where: { id: postId },
    });
    return res
      .status(200)
      .json({ message: "Post Updated", dataUpdated: updatedPost });
  }
}

module.exports = new PostsService();
