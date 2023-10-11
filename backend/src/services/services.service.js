const connectMySQL = require("../configs/db.config.js");
const { Op, col, fn } = require("sequelize");
const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const sourceImage = process.env.BASE_URL_IMAGE;

const servicesRepo = require("../repository/services.repository.js");

// ---------------------------------------------------------
class ServicesService {
  // 1. Get All Services
  async getAllServices() {
    const listServices = await servicesRepo.getAllServices();
    if (listServices.length === 0) {
      return { data: "No Data Services", status: 404 };
    } else {
      return { data: listServices, status: 200 };
    }
  }

  // 2. Get Detail Service
  async getDetailService(serviceId) {
    const detailService = await servicesRepo.getDetailService(serviceId);
    if (detailService.length === 0) {
      return { data: "No Data Service", status: 404 };
    } else {
      return { data: detailService, status: 200 };
    }
  }

  // 3. Add Service
  async addService(dataBody, serviceImage) {
    const { name, description, price, working_time_id } = dataBody;

    const servicesInfo = {
      name: name,
      description: description,
      price: price,
      working_time_id: working_time_id,
      service_image: sourceImage + serviceImage,
    };
    const newService = await servicesRepo.addService(servicesInfo);
    return { data: newService, status: 200 };
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
}

module.exports = new ServicesService();
