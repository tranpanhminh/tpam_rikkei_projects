const connectMySQL = require("../configs/db.config.js");
const vendorsModel = require("../models/vendors.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class VendorsController {
  // 1. Get All Vendors
  async getAllVendors(req, res) {
    try {
      const listVendors = await vendorsModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listVendors);
      console.log(listVendors, "listVendors");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Vendor
  async getDetailVendor(req, res) {
    try {
      const vendorId = req.params.vendorId;
      const detailVendor = await vendorsModel.findOne({
        where: { id: vendorId },
      });
      if (!detailVendor) {
        return res.status(404).json({ message: "Vendor ID Not Found" });
      } else {
        return res.status(200).json(detailVendor);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Vendor
  async addVendor(req, res) {
    const { name } = req.body;
    try {
      if (!name) {
        res.status(406).json({ message: "Vendor Name not be blank" });
      } else {
        const vendorInfo = {
          name: name,
        };
        const newVendor = await vendorsModel.create(vendorInfo);
        res.status(200).json({ message: "Vendor Added", data: vendorInfo });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Vendor
  async deleteVendor(req, res) {
    try {
      const vendorId = req.params.vendorId;
      const findVendor = await vendorsModel.findOne({
        where: { id: vendorId },
      });
      if (!findVendor) {
        return res.status(404).json({ message: "Vendor ID Not Found" });
      } else {
        const deleteVendor = await vendorsModel.destroy({
          where: { id: vendorId },
        });
        return res
          .status(200)
          .json({ message: "Vendor Deleted", dataDeleted: findVendor });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Vendor
  async updateVendor(req, res) {
    const { name } = req.body;
    try {
      const vendorId = req.params.vendorId;
      const findVendor = await vendorsModel.findOne({
        where: { id: vendorId },
      });
      if (!findVendor) {
        return res.status(404).json({ message: "Vendor ID Not Found" });
      }

      const dataVendor = findVendor.dataValues;

      const vendorInfo = {
        name: !name ? dataVendor.name : name,
        updated_at: Date.now(),
      };

      const updatedVendor = await vendorsModel.update(vendorInfo, {
        where: { id: vendorId },
      });
      return res
        .status(403)
        .json({ message: "Vendor Updated", dataUpdated: vendorInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}

module.exports = new VendorsController();
