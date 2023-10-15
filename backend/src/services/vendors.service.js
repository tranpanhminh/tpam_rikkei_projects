const vendorsRepo = require("../repository/vendors.repository.js");

// ---------------------------------------------------------
class VendorsService {
  // 1. Get All
  async getAllVendors() {
    const listVendors = await vendorsRepo.getAllVendors();
    if (listVendors.length === 0) {
      return { data: [], status: 404 };
    } else {
      return { data: listVendors, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailVendor(vendorId) {
    const detailVendor = await vendorsRepo.getDetailVendor(vendorId);
    if (!detailVendor) {
      return { data: {}, status: 404 };
    } else {
      return { data: detailVendor, status: 200 };
    }
  }

  // 3. Add
  async addVendor(name) {
    if (!name) {
      return { message: "Vendor Name must not be blank", status: 406 };
    } else {
      const vendorInfo = {
        name: name,
      };
      await vendorsRepo.addVendor(vendorInfo);
      return { message: "Vendor Added", status: 200 };
    }
  }

  // 4. Delete
  async deleteVendor(vendorId) {
    const findVendor = await vendorsRepo.findVendorById(vendorId);
    if (!findVendor) {
      return { message: "Vendor ID Not Found", status: 404 };
    } else {
      await vendorsRepo.deleteVendor(vendorId);
      return { message: "Vendor Deleted", status: 200 };
    }
  }

  // 5. Update
  async updateVendor(name, vendorId) {
    const findVendor = await vendorsRepo.findVendorById(vendorId);
    if (!findVendor) {
      return { message: "Vendor ID Not Found", status: 404 };
    }

    const dataVendor = findVendor.dataValues;

    const vendorInfo = {
      name: !name ? dataVendor.name : name,
      updated_at: Date.now(),
    };

    await vendorsRepo.updateVendor(vendorInfo, vendorId);
    return { message: "Vendor Status Updated", status: 200 };
  }
}

module.exports = new VendorsService();
