const vendorsEntity = require("../entities/vendors.entity.js");

// ---------------------------------------------------------
class VendorsRepo {
  async findVendorById(vendorId) {
    const findVendor = await vendorsEntity.findOne({
      where: { id: vendorId },
    });
    return findVendor;
  }

  // 1. Get All
  async getAllVendors() {
    const listVendors = await vendorsEntity.findAll();
    return listVendors;
  }

  // // 2. Get Detail
  async getDetailVendor(vendorId) {
    const findVendor = await vendorsEntity.findOne({
      where: { id: vendorId },
    });
    return findVendor;
  }

  // 3. Add
  async addVendor(vendorInfo) {
    const newVendor = await vendorsEntity.create(vendorInfo);
    return newVendor;
  }

  // 4. Delete
  async deleteVendor(vendorId) {
    const deleteVendor = await vendorsEntity.destroy({
      where: { id: vendorId },
    });
    return deleteVendor;
  }

  // 5. Update
  async updateVendor(vendorInfo, vendorId) {
    const updateVendor = await vendorsEntity.update(vendorInfo, {
      where: { id: vendorId },
    });
    return updateVendor;
  }
}

module.exports = new VendorsRepo();
