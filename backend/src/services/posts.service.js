const sourceImage = process.env.BASE_URL_IMAGE;

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
  async addPost(dataBody, thumbnail) {
    const { title, content, author, status_id } = dataBody;

    if (!title) {
      return { data: "Title must not be blank", status: 406 };
    }
    if (!content) {
      return { data: "Content must not be blank", status: 406 };
    }
    if (!author) {
      return { data: "Author must not be blank", status: 406 };
    }
    if (!status_id) {
      return { data: "Status ID must not be blank", status: 406 };
    }

    if (!thumbnail && status_id == 2) {
      return {
        data: "You can't set to Published until you set thumbnail",
        status: 406,
      };
    }

    const postInfo = {
      title: title,
      content: content,
      thumbnail_url: thumbnail ? sourceImage + thumbnail : thumbnail,
      author: author,
      status_id: status_id,
      post_type_id: 3,
    };
    const newPost = await postsRepo.addPost(postInfo);

    return {
      data: newPost,
      status: 200,
    };
  }

  // 4. Delete Post
  async deletePost(postId) {
    const findPost = await postsRepo.findPostById(postId);
    if (!findPost) {
      return {
        data: "Post ID Not Found",
        status: 404,
      };
    } else {
      await postsRepo.deletePost(postId);
      return {
        data: "Post Deleted",
        status: 200,
      };
    }
  }

  // 5. Update Post
  async updatePost(dataBody, thumbnail, postId) {
    const { title, content, author, status_id } = dataBody;
    const findPost = await postsRepo.findPostById(postId);
    if (!findPost) {
      return {
        data: "Post ID Not Found",
        status: 404,
      };
    }
    const dataPost = findPost.dataValues;

    if (!thumbnail && status_id == 2) {
      return {
        data: "You can't publish post until thumbnail set",
        status: 406,
      };
    }

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

    await postsRepo.updatePost(postInfo, postId);
    return {
      data: "Post Updated",
      status: 200,
    };
  }
}

module.exports = new PostsService();
