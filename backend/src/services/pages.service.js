const sourceImage = process.env.BASE_URL_IMAGE;

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
  async addPage(dataBody, thumbnail) {
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

    const pageInfo = {
      title: title,
      content: content,
      thumbnail_url: thumbnail ? sourceImage + thumbnail : thumbnail,
      author: author,
      status_id: status_id,
      post_type_id: 4,
    };
    const newPage = await pagesRepo.addPage(pageInfo);

    return {
      data: newPage,
      status: 200,
    };
  }

  // 4. Delete Page
  async deletePage(pageId) {
    const findPage = await pagesRepo.findPageById(pageId);
    if (!findPage) {
      return {
        data: "Page ID Not Found",
        status: 404,
      };
    } else {
      await pagesRepo.deletePage(pageId);
      return {
        data: "Page Deleted",
        status: 200,
      };
    }
  }

  // 5. Update Page
  async updatePage(dataBody, thumbnail, pageId) {
    const { title, content, author, status_id } = dataBody;
    const findPage = await pagesRepo.findPageById(pageId);
    if (!findPage) {
      return {
        data: "Page ID Not Found",
        status: 404,
      };
    }
    const dataPage = findPage.dataValues;

    if (!dataPage.thumbnail_url && !thumbnail && status_id == 2) {
      return {
        data: "You can't publish page until thumbnail set",
        status: 406,
      };
    }

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

    await pagesRepo.updatePage(pageInfo, pageId);
    return {
      data: "Page Updated",
      status: 200,
    };
  }
}

module.exports = new PagesService();
