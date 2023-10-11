const postTypesEntity = require("../entities/postTypes.entity.js");

// ---------------------------------------------------------
class PostTypesRepo {
  async findPostTypeById(postTypeId) {
    const findPostType = await postTypesEntity.findOne({
      where: { id: postTypeId },
    });
    return findPostType;
  }

  // 1. Get All
  async getAllPostTypes() {
    const listPostTypes = await postTypesEntity.findAll();
    return listPostTypes;
  }

  // // 2. Get Detail
  async getDetailPostType(postTypeId) {
    const findPostType = await postTypesEntity.findOne({
      where: { id: postTypeId },
    });
    return findPostType;
  }

  // 3. Add
  async addPostType(postTypeInfo) {
    const newPostType = await postTypesEntity.create(postTypeInfo);
    return newPostType;
  }

  // 4. Delete
  async deletePostType(postTypeId) {
    const deletePostType = await postTypesEntity.destroy({
      where: { id: postTypeId },
    });
    return deletePostType;
  }

  // 5. Update
  async updatePostType(postTypeInfo, postTypeId) {
    const updatePostType = await postTypesEntity.update(postTypeInfo, {
      where: { id: postTypeId },
    });
    return updatePostType;
  }
}

module.exports = new PostTypesRepo();
