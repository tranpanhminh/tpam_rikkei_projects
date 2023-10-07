const connectMySQL = require("../configs/db.config.js");
const postTypesModel = require("../models/postTypes.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class PostTypesController {
  // 1. Get All Post Types
  async getAllPostTypes(req, res) {
    try {
      const listPostTypes = await postTypesModel.findAll();
      res.status(200).json(listPostTypes);
      console.log(listPostTypes, "listPostTypes");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Post Type
  async getDetailPostType(req, res) {
    try {
      const postTypeId = req.params.postTypeId;
      const detailPostType = await postTypesModel.findOne({
        where: { id: postTypeId },
      });
      if (!detailPostType) {
        return res.status(404).json({ message: "Post Type ID Not Found" });
      } else {
        return res.status(200).json(detailVendor);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Post Type
  async addPostType(req, res) {
    const { name } = req.body;
    try {
      if (!name) {
        res.status(406).json({ message: "Post Type Name not be blank" });
      } else {
        const postTypeInfo = {
          name: name,
        };
        const newPostType = await postTypesModel.create(postTypeInfo);
        res
          .status(200)
          .json({ message: "Post Type Added", data: postTypeInfo });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Post Type
  async deletePostType(req, res) {
    try {
      const postTypeId = req.params.postTypeId;
      const findPostType = await postTypesModel.findOne({
        where: { id: postTypeId },
      });
      if (!findPostType) {
        return res.status(404).json({ message: "Post Type ID Not Found" });
      } else {
        const deletePostType = await postTypesModel.destroy({
          where: { id: postTypeId },
        });
        return res
          .status(200)
          .json({ message: "Post Type Deleted", dataDeleted: findPostType });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Post Type
  async updatePostType(req, res) {
    const { name } = req.body;
    try {
      const postTypeId = req.params.postTypeId;
      const findPostType = await postTypesModel.findOne({
        where: { id: postTypeId },
      });

      if (!findPostType) {
        return res.status(404).json({ message: "Post Type ID Not Found" });
      }

      const dataPostType = findPostType.dataValues;

      const postTypeInfo = {
        name: !name ? dataPostType.name : name,
        updated_at: Date.now(),
      };

      const updatedPostType = await postTypesModel.update(postTypeInfo, {
        where: { id: postTypeId },
      });
      return res
        .status(403)
        .json({ message: "Post Type Updated", dataUpdated: postTypeInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}

module.exports = new PostTypesController();
