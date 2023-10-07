const connectMySQL = require("../configs/db.config.js");
const servicesModel = require("../models/services.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class ServicesController {
  // 1. Get All Services
  async getAllServices(req, res) {
    try {
      const listServices = await servicesModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listServices);
      console.log(listServices, "listServices");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Service
  async getDetailService(req, res) {
    try {
      const serviceId = req.params.serviceId;
      const detailService = await servicesModel.findOne({
        where: { id: serviceId },
      });
      if (!detailService) {
        return res.status(404).json({ message: "Service ID Not Found" });
      } else {
        return res.status(200).json(detailService);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Service
  async addService(req, res) {
    const { name, description, price, morning_time, afternoon_time } = req.body;
    try {
      const servicesInfo = {
        name: name,
        description: description,
        price: price,
        morning_time: morning_time,
        afternoon_time: afternoon_time,
        service_image: req.file.filename,
      };
      console.log(servicesInfo, "servicesInfo");
      const newService = await servicesModel.create(servicesInfo);
      res.status(200).json({ message: "Service Added", data: servicesInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Service
  async deleteService(req, res) {
    try {
      const serviceId = req.params.serviceId;
      const findService = await servicesModel.findOne({
        where: { id: serviceId },
      });
      if (!findService) {
        return res.status(404).json({ message: "Service ID Not Found" });
      } else {
        const deleteService = await servicesModel.destroy({
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
    const { name, description, price, morning_time, afternoon_time } = req.body;
    try {
      const serviceId = req.params.serviceId;
      const findService = await servicesModel.findOne({
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
        morning_time: !morning_time ? dataService.morning_time : morning_time,
        afternoon_time: !afternoon_time
          ? dataService.afternoon_time
          : afternoon_time,
        service_image: !req.file
          ? dataService.service_image
          : req.file.filename,
        updated_at: Date.now(),
      };
      console.log(serviceInfo, "serviceInfo");
      const updatedService = await servicesModel.update(serviceInfo, {
        where: { id: serviceId },
      });
      return res
        .status(200)
        .json({ message: "Service Updated", dateUpdated: serviceInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new ServicesController();
