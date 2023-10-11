const connectMySQL = require("../configs/db.config.js");
const { Op, col, fn } = require("sequelize");
const sequelize = require("sequelize");
const workingTimeEntity = require("../entities/workingTime.entity.js");
const postTypesEntity = require("../entities/postTypes.entity.js");
const servicesEntity = require("../entities/services.entity.js");
const bcrypt = require("bcryptjs");
const sourceImage = process.env.BASE_URL_IMAGE;

// ---------------------------------------------------------
class ServicesController {
  // 1. Get All Services
  async getAllServices(req, res) {
    try {
      // const listServices = await servicesEntity.findAll();
      const listServices = await servicesEntity.findAll({
        // Chọn các thuộc tính cần thiết
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "service_image",
          "working_time_id",
          "post_type_id",
          "created_at",
          "updated_at",
          [
            sequelize.literal(
              `IFNULL((SELECT ROUND(AVG(rating), 1) FROM service_comments WHERE service_comments.post_id = services.id AND service_comments.user_role_id NOT IN (1, 2)), 0)`
            ),
            "avg_rating",
          ],
        ],
        // Tham gia với bảng post_types
        include: [
          {
            model: postTypesEntity,
            attributes: ["name"],
          },
          {
            model: workingTimeEntity,
            attributes: ["morning_time", "afternoon_time"],
          },
        ],

        // Nhóm theo id và tên của dịch vụ
        group: ["id", "name"],
        raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
      });
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
      // const detailService = await servicesEntity.findOne({
      //   where: { id: serviceId },
      // });
      const detailService = await servicesEntity.findOne({
        // Chọn các thuộc tính cần thiết
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "service_image",
          "working_time_id",
          "post_type_id",
          "created_at",
          "updated_at",
          [
            sequelize.literal(
              `IFNULL((SELECT ROUND(AVG(rating), 1) FROM service_comments WHERE service_comments.post_id = services.id AND service_comments.user_role_id NOT IN (1, 2)), 0)`
            ),
            "avg_rating",
          ],
        ],

        // Tham gia với bảng post_types
        include: [
          {
            model: postTypesEntity,
            attributes: ["name"],
          },
          {
            model: workingTimeEntity,
            attributes: ["morning_time", "afternoon_time"],
          },
        ],

        // Lọc theo id của dịch vụ
        where: { id: serviceId },

        // Nhóm theo id và tên của dịch vụ
        group: ["id", "name"],
        raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
      });

      if (!detailService) {
        return res.status(404).json({ message: "Service ID Not Found" });
      } else {
        return res.status(200).json(detailService);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // 3. Add Service
  async addService(req, res) {
    const { name, description, price, working_time_id } = req.body;
    try {
      const servicesInfo = {
        name: name,
        description: description,
        price: price,
        working_time_id: working_time_id,
        service_image: sourceImage + req.file.filename,
      };
      console.log(servicesInfo, "servicesInfo");
      const newService = await servicesEntity.create(servicesInfo);
      res.status(200).json({ message: "Service Added", data: newService });
    } catch (error) {
      console.log(error, "ERROR");
    }
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
