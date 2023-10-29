const postTypesRepo = require("../repository/postTypes.repository.js");

// ---------------------------------------------------------
class PostTypesService {
  // 1. Get All
  async getAllPostTypes() {
    const listPostTypes = await postTypesRepo.getAllPostTypes();
    if (listPostTypes.length === 0) {
      return { data: [], status: 404 };
    } else {
      return { data: listPostTypes, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailPostType(postTypeId) {
    const detailPostType = await postTypesRepo.getDetailPostType(postTypeId);
    if (!detailPostType) {
      return { data: {}, status: 404 };
    } else {
      return { data: detailPostType, status: 200 };
    }
  }

  // 3. Add
  async addPostType(name) {
    if (!name) {
      return { message: "PostType Name must not be blank", status: 406 };
    } else {
      const postTypeInfo = {
        name: name,
      };
      await postTypesRepo.addPostType(postTypeInfo);
      return { message: "PostType Added", status: 200 };
    }
  }

  // 4. Delete
  async deletePostType(postTypeId) {
    const findPostType = await postTypesRepo.findPostTypeById(postTypeId);
    if (!findPostType) {
      return { message: "PostType ID Not Found", status: 404 };
    } else {
      await postTypesRepo.deletePostType(postTypeId);
      return { message: "PostType Deleted", status: 200 };
    }
  }

  // 5. Update
  async updatePostType(name, postTypeId) {
    const findPostType = await postTypesRepo.findPostTypeById(postTypeId);
    if (!findPostType) {
      return { message: "PostType ID Not Found", status: 404 };
    }

    const dataPostType = findPostType.dataValues;

    const postTypeInfo = {
      name: !name ? dataPostType.name : name,
      updated_at: Date.now(),
    };

    await postTypesRepo.updatePostType(postTypeInfo, postTypeId);
    return { message: "PostType Status Updated", status: 200 };
  }
}

module.exports = new PostTypesService();