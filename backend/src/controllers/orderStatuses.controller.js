const connectMySQL = require("../configs/db.config.js");
const orderStatusesEntity = require("../entities/orderStatuses.entity.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class OrderStatusesController {
  // 1. Get All Order Statuses
  async getAllOrderStatuses(req, res) {
    try {
      const listOrderStatuses = await orderStatusesEntity.findAll();
      res.status(200).json(listOrderStatuses);
      console.log(listOrderStatuses, "listOrderStatuses");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Order Status
  async getDetailOrderStatus(req, res) {
    try {
      const orderStatusId = req.params.orderStatusId;
      const detailOrderStatus = await orderStatusesEntity.findOne({
        where: { id: orderStatusId },
      });
      if (!detailOrderStatus) {
        return res.status(404).json({ message: "Order Status ID Not Found" });
      } else {
        return res.status(200).json(detailOrderStatus);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Order Status
  async addOrderStatus(req, res) {
    const { name } = req.body;
    try {
      if (!name) {
        res
          .status(406)
          .json({ message: "Order Status Name must not be blank" });
      } else {
        const orderStatusInfo = {
          name: name,
        };
        const newOrderStatus = await orderStatusesEntity.create(
          orderStatusInfo
        );
        res
          .status(200)
          .json({ message: "Order Status Added", data: newOrderStatus });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Order Status
  async deleteOrderStatus(req, res) {
    try {
      const orderStatusId = req.params.orderStatusId;
      const findOrderStatus = await orderStatusesEntity.findOne({
        where: { id: orderStatusId },
      });
      if (!findOrderStatus) {
        return res.status(404).json({ message: "Order Status ID Not Found" });
      } else {
        const deleteOrderStatus = await orderStatusesEntity.destroy({
          where: { id: orderStatusId },
        });
        return res.status(200).json({
          message: "Order Status Deleted",
          dataDeleted: findOrderStatus,
        });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Order Status
  async updateOrderStatus(req, res) {
    const { name } = req.body;
    try {
      const orderStatusId = req.params.orderStatusId;
      const findOrderStatus = await orderStatusesEntity.findOne({
        where: { id: orderStatusId },
      });

      if (!findOrderStatus) {
        return res.status(404).json({ message: "Order Status ID Not Found" });
      }

      const dataOrderStatus = findOrderStatus.dataValues;

      const orderStatusInfo = {
        name: !name ? dataOrderStatus.name : name,
        updated_at: Date.now(),
      };

      const updatedOrderStatus = await orderStatusesEntity.update(
        orderStatusInfo,
        {
          where: { id: orderStatusId },
        }
      );
      return res.status(200).json({
        message: "Order Status Updated",
        dataUpdated: updatedOrderStatus,
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}

module.exports = new OrderStatusesController();
