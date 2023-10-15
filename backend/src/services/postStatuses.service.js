const postStatusesRepo = require("../repository/postStatuses.repository.js");

// ---------------------------------------------------------
class PostStatusesService {
  // 1. Get All
  async getAllPostStatuses() {
    const listPostStatuses = await postStatusesRepo.getAllPostStatuses();
    if (listPostStatuses.length === 0) {
      return { data: [], status: 404 };
    } else {
      return { data: listPostStatuses, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailPostStatus(postStatusId) {
    const detailPostStatus = await postStatusesRepo.getDetailPostStatus(
      postStatusId
    );
    if (!detailPostStatus) {
      return { data: {}, status: 404 };
    } else {
      return { data: detailPostStatus, status: 200 };
    }
  }

  // 3. Add
  async addPostStatus(name) {
    if (!name) {
      return { message: "PostStatus Name must not be blank", status: 406 };
    } else {
      const postStatusInfo = {
        name: name,
      };
      await postStatusesRepo.addPostStatus(postStatusInfo);
      return { message: "PostStatus Added", status: 200 };
    }
  }

  // 4. Delete
  async deletePostStatus(postStatusId) {
    const findPostStatus = await postStatusesRepo.findPostStatusById(
      postStatusId
    );
    if (!findPostStatus) {
      return { message: "PostStatus ID Not Found", status: 404 };
    } else {
      await postStatusesRepo.deletePostStatus(postStatusId);
      return { message: "PostStatus Deleted", status: 200 };
    }
  }

  // 5. Update
  async updatePostStatus(name, postStatusId) {
    const findPostStatus = await postStatusesRepo.findPostStatusById(
      postStatusId
    );
    if (!findPostStatus) {
      return { message: "PostStatus ID Not Found", status: 404 };
    }

    const dataPostStatus = findPostStatus.dataValues;

    const postStatusInfo = {
      name: !name ? dataPostStatus.name : name,
      updated_at: Date.now(),
    };

    await postStatusesRepo.updatePostStatus(postStatusInfo, postStatusId);
    return { message: "PostStatus Status Updated", status: 200 };
  }
}

module.exports = new PostStatusesService();
