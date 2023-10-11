// Import Service
const pagesService = require("../services/pages.service.js");

// ---------------------------------------------------------
class PagesController {
  // 1. Get All Pages
  async getAllPages(req, res) {
    const result = await pagesService.getAllPages();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail Page
  async getDetailPage(req, res) {
    const pageId = req.params.pageId;
    const result = await pagesService.getDetailPage(pageId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add Page
  async addPage(req, res) {
    const dataBody = req.body;
    const thumbnail = req.file ? req.file.filename : "";
    const result = await pagesService.addPage(dataBody, thumbnail);
    return res.status(result.status).json(result.data);
  }

  // 4. Delete Page
  async deletePage(req, res) {
    const pageId = req.params.pageId;
    const result = await pagesService.deletePage(pageId);
    return res.status(result.status).json(result.data);
  }

  // 5. Update Page
  async updatePage(req, res) {
    const dataBody = req.body;
    const thumbnail = req.file ? req.file.filename : "";
    const pageId = req.params.pageId;

    const result = await pagesService.updatePage(dataBody, thumbnail, pageId);
    return res.status(result.status).json(result.data);
  }
}
module.exports = new PagesController();
