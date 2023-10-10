const connectMySQL = require("../configs/db.config.js");
const pagesModel = require("../models/pages.model.js");
const postTypesModel = require("../models/postTypes.model.js");
const postStatusesModel = require("../models/postStatuses.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class PagesController {
  // 1. Get All Pages
  async getAllPages(req, res) {
    try {
      // const listPages = await pagesModel.findAll();

      const listPages = await pagesModel.findAll({
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
            model: postTypesModel,
            attributes: ["name"],
          },
          {
            model: postStatusesModel,
            attributes: ["name"],
          },
        ],

        // Nhóm theo id và tên của dịch vụ
        group: ["id"],
        raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
      });
      res.status(200).json(listPages);
      console.log(listPages, "listPages");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Page
  async getDetailPage(req, res) {
    try {
      const pageId = req.params.pageId;
      // const detailPage = await pagesModel.findOne({
      //   where: { id: pageId },
      // });

      const detailPage = await pagesModel.findAll({
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
            model: postTypesModel,
            attributes: ["name"],
          },
          {
            model: postStatusesModel,
            attributes: ["name"],
          },
        ],

        // Nhóm theo id và tên của dịch vụ
        where: { id: pageId },
        group: ["id"],
        raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
      });

      if (!detailPage) {
        return res.status(404).json({ message: "Page ID Not Found" });
      } else {
        return res.status(200).json(detailPage);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Page
  async addPage(req, res) {
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

      if (!req.file && status_id == 2) {
        return res.status(406).json({
          message: "You can't set to Published until you set thumbnail",
        });
      }

      const pageInfo = {
        title: title,
        content: content,
        thumbnail_url: thumbnail,
        author: author,
        status_id: status_id,
        post_type_id: 4,
      };
      const newPage = await pagesModel.create(pageInfo);
      res.status(200).json({ message: "Page Added", data: newPage });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Page
  async deletePage(req, res) {
    try {
      const pageId = req.params.pageId;
      const findPage = await pagesModel.findOne({
        where: { id: pageId },
      });
      if (!findPage) {
        return res.status(404).json({ message: "Page ID Not Found" });
      } else {
        const deletePage = await pagesModel.destroy({
          where: { id: pageId },
        });
        return res
          .status(200)
          .json({ message: "Page Deleted", dataDeleted: findPage });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Page
  async updatePage(req, res) {
    const { title, content, thumbnail_url, author, status_id } = req.body;
    const thumbnail = req.file ? req.file.filename : "";
    try {
      const pageId = req.params.pageId;
      const findPage = await pagesModel.findOne({
        where: { id: pageId },
      });

      const dataPage = findPage.dataValues;

      const pageInfo = {
        title: !title ? dataPage.title : title,
        content: !content ? dataPage.content : content,
        thumbnail_url: !thumbnail ? dataPage.thumbnail_url : thumbnail,
        author: !author ? dataPage.author : author,
        status_id: !status_id ? dataPage.status_id : status_id,
        updated_at: Date.now(),
      };

      const updatedPage = await pagesModel.update(pageInfo, {
        where: { id: pageId },
      });
      return res
        .status(200)
        .json({ message: "Page Updated", dataUpdated: updatedPage });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new PagesController();
