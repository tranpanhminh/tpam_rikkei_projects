const connectMySQL = require("../configs/db.config.js");
const { Op, col, fn } = require("sequelize");
const sequelize = require("sequelize");
const workingTimeEntity = require("../entities/workingTime.entity.js");
const postTypesEntity = require("../entities/postTypes.entity.js");
const servicesEntity = require("../entities/services.entity.js");
const bcrypt = require("bcryptjs");
const sourceImage = process.env.BASE_URL_IMAGE;

const servicesService = require("../services/services.service.js");

// ---------------------------------------------------------
class ServicesController {
  // 1. Get All Services
  async getAllServices(req, res) {
    const result = await servicesService.getAllServices();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail Service
  async getDetailService(req, res) {
    const serviceId = req.params.serviceId;
    const result = await servicesService.getDetailService(serviceId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add Service
  async addService(req, res) {
    const dataBody = req.body;
    const serviceImage = req.file.filename;
    const result = await servicesService.addService(dataBody, serviceImage);
    return res.status(result.status).json(result.data);
  }

  // 4. Delete Service
  async deleteService(req, res) {
    const serviceId = req.params.serviceId;
    const result = await servicesService.deleteService(serviceId);
    return res.status(result.status).json(result.data);
  }

  // 5. Update Service
  async updateService(req, res) {
    const serviceId = req.params.serviceId;
    const dataBody = req.body;
    const newImage = req.file;
    const result = await servicesService.updateService(
      serviceId,
      dataBody,
      newImage
    );
    return res.status(result.status).json(result.data);
  }
}
module.exports = new ServicesController();
