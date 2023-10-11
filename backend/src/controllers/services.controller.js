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
    try {
      const serviceId = req.params.serviceId;
      const findService = await servicesEntity.findOne({
        where: { id: serviceId },
      });
      if (!findService) {
        return res.status(404).json({ message: "Service ID Not Found" });
      } else {
        const deleteService = await servicesEntity.destroy({
          where: { id: serviceId },
        });
        return res
          .status(200)
          .json({ message: "Service Deleted", dataDeleted: findService });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Service
  async updateService(req, res) {
    const { name, description, price, working_time_id } = req.body;
    try {
      const serviceId = req.params.serviceId;
      const findService = await servicesEntity.findOne({
        where: { id: serviceId },
      });

      if (!findService) {
        return res.status(404).json({ message: "Service ID Not Found" });
      }
      const dataService = findService.dataValues;

      if (price < 0) {
        return res.status(406).json({ message: "Price must not be < 0" });
      }

      const serviceInfo = {
        name: !name ? dataService.name : name,
        description: !description ? dataService.description : description,
        price: !price ? dataService.price : price,
        working_time_id: !working_time_id
          ? dataService.working_time_id
          : working_time_id,
        service_image: !req.file
          ? dataService.service_image
          : sourceImage + req.file.filename,
        updated_at: Date.now(),
      };
      console.log(serviceInfo, "serviceInfo");
      const updatedService = await servicesEntity.update(serviceInfo, {
        where: { id: serviceId },
      });
      return res
        .status(200)
        .json({ message: "Service Updated", dateUpdated: updatedService });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new ServicesController();
