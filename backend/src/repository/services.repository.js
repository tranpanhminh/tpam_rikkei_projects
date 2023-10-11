const sequelize = require("sequelize");
const workingTimeEntity = require("../entities/workingTime.entity.js");
const postTypesEntity = require("../entities/postTypes.entity.js");
const servicesEntity = require("../entities/services.entity.js");

class ServicesService {
  // Find Service By Id
  async findServiceById(serviceId) {
    const findService = await servicesEntity.findOne({
      where: { id: serviceId },
    });
    return findService;
  }
  // 1. Get All Services
  async getAllServices() {
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
    return listServices;
  }

  // 2. Get Detail Service
  async getDetailService(serviceId) {
    // const listServices = await servicesEntity.findAll();
    const detailService = await servicesEntity.findAll({
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
      where: { id: serviceId },
      group: ["id", "name"],
      raw: true, // Điều này sẽ giúp "post_type" trả về như một chuỗi
    });
    return detailService;
  }

  // 3. Add Service
  async addService(servicesInfo) {
    const newService = await servicesEntity.create(servicesInfo);
    return newService;
  }

  // 4. Delete Service
  async deleteService(serviceId) {
    const deleteService = await servicesEntity.destroy({
      where: { id: serviceId },
    });
    return deleteService;
  }

  // 5. Update Service
  async updateService(serviceInfo, serviceId) {
    const updatedService = await servicesEntity.update(serviceInfo, {
      where: { id: serviceId },
    });
    return updatedService;
  }
}

module.exports = new ServicesService();
