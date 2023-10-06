const express = require("express");

// Import Model
const servicesModel = require("../models/services.model.js");

// Import Router
const servicesRouter = express.Router();

// Import Controller
const servicesController = require("../controllers/services.controller.js");

// ---------------------------------------------------------

// 1. Get All Services
servicesRouter.get("/", servicesController.getAllServices);

// 2. Get Detail Service
servicesRouter.get("/detail/:serviceId", servicesController.getDetailService);

// 3. Add Service
servicesRouter.post("/add", servicesController.addService);

// // 4. Delete Service
// servicesRouter.delete("/delete/:serviceId", servicesController.deleteService);

// // 5. Update Service
// servicesRouter.patch("/update/:serviceId", servicesController.updateService);

module.exports = servicesRouter;
