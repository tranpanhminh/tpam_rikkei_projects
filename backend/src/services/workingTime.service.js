const workingTimeRepo = require("../repository/workingTime.repository.js");

// ---------------------------------------------------------
class WorkingTimeService {
  // 1. Get All
  async getAllWorkingTime() {
    const listWorkingTime = await workingTimeRepo.getAllWorkingTime();
    if (listWorkingTime.length === 0) {
      return { data: "No Working Time Found", status: 404 };
    } else {
      return { data: listWorkingTime, status: 200 };
    }
  }

  // 2. Get Detail
  async getDetailWorkingTime(workingTimeId) {
    const detailWorkingTime = await workingTimeRepo.getDetailWorkingTime(
      workingTimeId
    );
    if (!detailWorkingTime) {
      return { data: "Working Time ID Not Found", status: 404 };
    } else {
      return { data: detailWorkingTime, status: 200 };
    }
  }

  // 3. Add
  async addWorkingTime(dataBody) {
    const { morning_time, afternoon_time } = dataBody;

    if (!morning_time) {
      return { data: "Morning Time must not be blank", status: 406 };
    }
    if (!afternoon_time) {
      return { data: "Afternoon Time must not be blank", status: 406 };
    }

    const workingTimeInfo = {
      morning_time: morning_time,
      afternoon_time: afternoon_time,
    };

    await workingTimeRepo.addWorkingTime(workingTimeInfo);
    return { data: "Working Time Added", status: 200 };
  }

  // 4. Delete
  async deleteWorkingTime(workingTimeId) {
    const findWorkingTime = await workingTimeRepo.findWorkingTimeById(
      workingTimeId
    );
    if (!findWorkingTime) {
      return { data: "Working Time ID Not Found", status: 404 };
    } else {
      await workingTimeRepo.deleteWorkingTime(workingTimeId);
      return { data: "Working Time Deleted", status: 200 };
    }
  }

  // 5. Update
  async updateWorkingTime(dataBody, workingTimeId) {
    const { morning_time, afternoon_time } = dataBody;

    const findWorkingTime = await workingTimeRepo.findWorkingTimeById(
      workingTimeId
    );
    if (!findWorkingTime) {
      return { data: "Working Time ID Not Found", status: 404 };
    }

    const dataWorkingTime = findWorkingTime.dataValues;

    const workingTimeInfo = {
      morning_time: !morning_time ? dataWorkingTime.morning_time : morning_time,
      afternoon_time: !afternoon_time
        ? dataWorkingTime.afternoon_time
        : afternoon_time,
      updated_at: Date.now(),
    };

    await workingTimeRepo.updateWorkingTime(workingTimeInfo, workingTimeId);
    return { data: "Working Time Updated", status: 200 };
  }
}

module.exports = new WorkingTimeService();
