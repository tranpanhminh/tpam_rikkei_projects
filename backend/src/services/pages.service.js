// Import Service
const pagesRepo = require("../repository/pages.repository.js");

// ---------------------------------------------------------

class PagesService {
  // 1. Get All Pages
  async getAllPages() {
    const listPages = await pagesRepo.getAllPages();
    if (listPages.length === 0) {
      return { data: "No Data Pages", status: 404 };
    } else {
      return { data: listPages, status: 200 };
    }
  }

  // 2. Get Detail Page
  async getDetailPage(pageId) {
    const detailPage = await pagesRepo.getDetailPage(pageId);

    if (detailPage.length === 0) {
      return { data: "Page ID Not Found", status: 404 };
    } else {
      return { data: detailPage, status: 200 };
    }
  }

  // 3. Add Page
  async addPage(req, res) {
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

    const pageInfo = {
      title: title,
      content: content,
      thumbnail_url: sourceImage + thumbnail,
      author: author,
      status_id: status_id,
      post_type_id: 4,
    };
    const newPage = await pagesEntity.create(pageInfo);
    res.status(200).json({ message: "Page Added", data: newPage });
  }

  // 4. Delete Page
  async deletePage(req, res) {
    const pageId = req.params.pageId;
    const findPage = await pagesEntity.findOne({
      where: { id: pageId },
    });
    if (!findPage) {
      return res.status(404).json({ message: "Page ID Not Found" });
    } else {
      const deletePage = await pagesEntity.destroy({
        where: { id: pageId },
      });
      return res
        .status(200)
        .json({ message: "Page Deleted", dataDeleted: findPage });
    }
  }

  // 5. Update Page
  async updatePage(req, res) {
    const { title, content, thumbnail_url, author, status_id } = req.body;
    const thumbnail = req.file ? req.file.filename : "";

    const pageId = req.params.pageId;
    const findPage = await pagesEntity.findOne({
      where: { id: pageId },
    });

    const dataPage = findPage.dataValues;

    const pageInfo = {
      title: !title ? dataPage.title : title,
      content: !content ? dataPage.content : content,
      thumbnail_url: !thumbnail
        ? dataPage.thumbnail_url
        : sourceImage + thumbnail,
      author: !author ? dataPage.author : author,
      status_id: !status_id ? dataPage.status_id : status_id,
      updated_at: Date.now(),
    };

    const updatedPage = await pagesEntity.update(pageInfo, {
      where: { id: pageId },
    });
    return res
      .status(200)
      .json({ message: "Page Updated", dataUpdated: updatedPage });
  }
}

module.exports = new PagesService();
