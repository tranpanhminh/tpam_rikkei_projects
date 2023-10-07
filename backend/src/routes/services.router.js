const express = require("express");

// Import Model
const servicesModel = require("../models/services.model.js");

// Import Router
const servicesRouter = express.Router();

// Import Controller
const servicesController = require("../controllers/services.controller.js");

// ---------------------------------------------------------
// Import Middleware
const uploadFile = require("../middlewares/uploadFiles.js");
const uploadFileAddService = require("../middlewares/CheckService/uploadFileAddService.js");
const checkAddServiceForm = require("../middlewares/CheckService/checkAddServiceForm.js");

// ---------------------------------------------------------

// 1. Get All Services
servicesRouter.get("/", servicesController.getAllServices);

// 2. Get Detail Service
servicesRouter.get("/detail/:serviceId", servicesController.getDetailService);

// 3. Add Service
// servicesRouter.post(
//   "/add",
//   uploadFile.none(),
//   checkAddServiceForm,
//   uploadFile.single("service_image"),
//   servicesController.addService
// );

servicesRouter.post(
  "/add",
  uploadFileAddService.single("service_image"),
  checkAddServiceForm,
  servicesController.addService
);

// 4. Delete Service
servicesRouter.delete("/delete/:serviceId", servicesController.deleteService);

// 5. Update Service
servicesRouter.patch(
  "/update/:serviceId",
  uploadFile.single("service_image"),
  servicesController.updateService
);

module.exports = servicesRouter;
