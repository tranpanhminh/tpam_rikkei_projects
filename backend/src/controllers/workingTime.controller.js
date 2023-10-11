const workingTimeEntity = require("../entities/workingTime.entity.js");

// ---------------------------------------------------------
class WorkingTimeController {
  // 1. Get All Working Time
  async getAllWorkingTime(req, res) {
    try {
      const listWorkingTime = await workingTimeEntity.findAll(); // include: <Tên bảng>
      res.status(200).json(listWorkingTime);
      console.log(listWorkingTime, "listWorkingTime");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Working Time
  async getDetailWorkingTime(req, res) {
    try {
      const workingTimeId = req.params.workingTimeId;
      const detailWorkingTime = await workingTimeEntity.findOne({
        where: { id: workingTimeId },
      });
      if (!detailWorkingTime) {
        return res.status(404).json({ message: "Working Time ID Not Found" });
      } else {
        return res.status(200).json(detailWorkingTime);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Working Time
  async addWorkingTime(req, res) {
    const { morning_time, afternoon_time } = req.body;
    try {
      if (!morning_time) {
        return res
          .status(406)
          .json({ message: "Morning Time must not be blank" });
      }
      if (!afternoon_time) {
        return res
          .status(406)
          .json({ message: "Afternoon Time must not be blank" });
      }

      const couponInfo = {
        morning_time: morning_time,
        afternoon_time: afternoon_time,
      };
      const newWorkingTime = await workingTimeEntity.create(couponInfo);
      res
        .status(200)
        .json({ message: "Working Time Added", data: newWorkingTime });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Working Time
  async deleteWorkingTime(req, res) {
    try {
      const workingTimeId = req.params.workingTimeId;
      const findWorkingTime = await workingTimeEntity.findOne({
        where: { id: workingTimeId },
      });
      if (!findWorkingTime) {
        return res.status(404).json({ message: "Working Time ID Not Found" });
      } else {
        const deleteWorkingTime = await workingTimeEntity.destroy({
          where: { id: workingTimeId },
        });
        return res.status(200).json({
          message: "Working Time Deleted",
          dataDeleted: findWorkingTime,
        });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Working Time
  async updateWorkingTime(req, res) {
    const { morning_time, afternoon_time } = req.body;
    const workingTimeId = req.params.workingTimeId;
    try {
      const findWorkingTime = await workingTimeEntity.findOne({
        where: { id: workingTimeId },
      });
      if (!findWorkingTime) {
        return res.status(404).json({ message: "Working Time ID Not Found" });
      }
      const dataWorkingTime = findWorkingTime.dataValues;

      const workingTimeInfo = {
        morning_time: !morning_time
          ? dataWorkingTime.morning_time
          : morning_time,
        afternoon_time: !afternoon_time
          ? dataWorkingTime.afternoon_time
          : afternoon_time,
        updated_at: Date.now(),
      };

      const updatedWorkingTime = await workingTimeEntity.update(
        workingTimeInfo,
        {
          where: { id: workingTimeId },
        }
      );
      return res.status(200).json({
        message: "Working Time Updated",
        dateUpdated: updatedWorkingTime,
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new WorkingTimeController();
