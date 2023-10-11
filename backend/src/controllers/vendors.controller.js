const vendorsService = require("../services/vendors.service.js");

// ---------------------------------------------------------
class VendorsController {
  // 1. Get All
  async getAllVendors(req, res) {
    const result = await vendorsService.getAllVendors();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail
  async getDetailVendor(req, res) {
    const vendorId = req.params.vendorId;
    const result = await vendorsService.getDetailVendor(vendorId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add
  async addVendor(req, res) {
    const { name } = req.body;
    const result = await vendorsService.addVendor(name);
    return res.status(result.status).json(result.data);
  }

  // 4. Delete
  async deleteVendor(req, res) {
    const vendorId = req.params.vendorId;
    const result = await vendorsService.deleteVendor(vendorId);
    return res.status(result.status).json(result.data);
  }

  // 5. Update
  async updateVendor(req, res) {
    const { name } = req.body;
    const vendorId = req.params.vendorId;
    const result = await vendorsService.updateVendor(name, vendorId);
    return res.status(result.status).json(result.data);
  }
}

module.exports = new VendorsController();
