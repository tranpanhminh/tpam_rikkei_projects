const express = require("express");

// Import Router
const vendorsRouter = express.Router();

// Import Controller
const vendorsController = require("../controllers/vendors.controller.js");

// ---------------------------------------------------------

// 1. Get All Vendors
vendorsRouter.get("/", vendorsController.getAllVendors);

// 2. Get Detail Vendor
vendorsRouter.get("/detail/:vendorId", vendorsController.getDetailVendor);

// 3. Add Vendor
vendorsRouter.post("/add", vendorsController.addVendor);

// 4. Delete Vendor
vendorsRouter.delete("/delete/:vendorId", vendorsController.deleteVendor);

// // 5. Update Vendor
vendorsRouter.patch("/update/:vendorId", vendorsController.updateVendor);

module.exports = vendorsRouter;
