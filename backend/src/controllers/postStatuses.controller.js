const connectMySQL = require("../configs/db.config.js");
const postStatusesEntity = require("../entities/postStatuses.entity.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class PostStatusesController {
  // 1. Get All Post Statuses
  async getAllPostStatuses(req, res) {
    try {
      const listPostsStatuses = await postStatusesEntity.findAll();
      res.status(200).json(listPostsStatuses);
      console.log(listPostsStatuses, "listPostsStatuses");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Post Status
  async getDetailPostStatus(req, res) {
    try {
      const postStatusId = req.params.postStatusId;
      const detailPostStatus = await postStatusesEntity.findOne({
        where: { id: postStatusId },
      });
      if (!detailPostStatus) {
        return res.status(404).json({ message: "Post Status ID Not Found" });
      } else {
        return res.status(200).json(detailPostStatus);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Post Status
  async addPostStatus(req, res) {
    const { name } = req.body;
    try {
      if (!name) {
        res.status(406).json({ message: "Post Status Name must not be blank" });
      } else {
        const postStatusInfo = {
          name: name,
        };
        const newPostStatus = await postStatusesEntity.create(postStatusInfo);
        res
          .status(200)
          .json({ message: "Post Status Added", data: newPostStatus });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Post Status
  async deletePostStatus(req, res) {
    try {
      const postStatusId = req.params.postStatusId;
      const findPostStatus = await postStatusesEntity.findOne({
        where: { id: postStatusId },
      });
      if (!findPostStatus) {
        return res.status(404).json({ message: "Post Status ID Not Found" });
      } else {
        const deletePostStatus = await postStatusesEntity.destroy({
          where: { id: postStatusId },
        });
        return res.status(200).json({
          message: "Post Status Deleted",
          dataDeleted: deletePostStatus,
        });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Post Status
  async updatePostStatus(req, res) {
    const { name } = req.body;
    try {
      const postStatusId = req.params.postStatusId;
      const findPostStatus = await postStatusesEntity.findOne({
        where: { id: postStatusId },
      });

      if (!findPostStatus) {
        return res.status(404).json({ message: "Post Status ID Not Found" });
      }

      const dataPostStatus = findPostStatus.dataValues;

      const postStatusInfo = {
        name: !name ? dataPostStatus.name : name,
        updated_at: Date.now(),
      };

      const updatedPostStatus = await postStatusesEntity.update(
        postStatusInfo,
        {
          where: { id: postStatusId },
        }
      );
      return res.status(200).json({
        message: "Post Status Updated",
        dataUpdated: updatedPostStatus,
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}

module.exports = new PostStatusesController();
