const connectMySQL = require("../configs/db.config.js");
const pagesEntity = require("../entities/pages.entity.js");
const postTypesEntity = require("../entities/postTypes.entity.js");
const postStatusesEntity = require("../entities/postStatuses.entity.js");
const bcrypt = require("bcryptjs");
const sourceImage = process.env.BASE_URL_IMAGE;

// ---------------------------------------------------------
class PagesRepo {
  // Find Page By Id
  async findPageById(pageId) {
    const findPage = await pagesEntity.findOne({
      where: { id: pageId },
    });
    return findPage;
  }

  // 1. Get All Pages
  async getAllPages() {
    // const listPages = await pagesEntity.findAll();

    const listPages = await pagesEntity.findAll({
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
          model: postTypesEntity,
          attributes: ["name"],
        },
        {
          model: postStatusesEntity,
          attributes: ["name"],
        },
      ],

      // Nhóm theo id và tên của dịch vụ
      group: ["id"],
      raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });
    return listPages;
  }

  // 2. Get Detail Page
  async getDetailPage(pageId) {
    const detailPage = await pagesEntity.findAll({
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
          model: postTypesEntity,
          attributes: ["name"],
        },
        {
          model: postStatusesEntity,
          attributes: ["name"],
        },
      ],

      // Nhóm theo id và tên của dịch vụ
      where: { id: pageId },
      group: ["id"],
      raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });

    return detailPage;
  }

  // 3. Add Page
  async addPage(pageInfo) {
    const newPage = await pagesEntity.create(pageInfo);
    return newPage;
  }

  // 4. Delete Page
  async deletePage(pageId) {
    const deletePage = await pagesEntity.destroy({
      where: { id: pageId },
    });
    return deletePage;
  }

  // 5. Update Page
  async updatePage(pageInfo, pageId) {
    const updatedPage = await pagesEntity.update(pageInfo, {
      where: { id: pageId },
    });
    return updatedPage;
  }
}

module.exports = new PagesRepo();
