const postStatusesEntity = require("../entities/postStatuses.entity.js");

// ---------------------------------------------------------
class PostStatusesRepo {
  async findPostStatusById(postStatusId) {
    const findPostStatus = await postStatusesEntity.findOne({
      where: { id: postStatusId },
    });
    return findPostStatus;
  }

  // 1. Get All
  async getAllPostStatuses() {
    const listPostStatuses = await postStatusesEntity.findAll();
    return listPostStatuses;
  }

  // // 2. Get Detail
  async getDetailPostStatus(postStatusId) {
    const findPostStatus = await postStatusesEntity.findOne({
      where: { id: postStatusId },
    });
    return findPostStatus;
  }

  // 3. Add
  async addPostStatus(postStatusInfo) {
    const newPostStatus = await postStatusesEntity.create(postStatusInfo);
    return newPostStatus;
  }

  // 4. Delete
  async deletePostStatus(postStatusId) {
    const deletePostStatus = await postStatusesEntity.destroy({
      where: { id: postStatusId },
    });
    return deletePostStatus;
  }

  // 5. Update
  async updatePostStatus(postStatusInfo, postStatusId) {
    const updatePostStatus = await postStatusesEntity.update(postStatusInfo, {
      where: { id: postStatusId },
    });
    return updatePostStatus;
  }
}

module.exports = new PostStatusesRepo();
