const workingTimeRepo = require("../repository/workingTime.repository.js");

// ---------------------------------------------------------
class WorkingTimeService {
  // 1. Get All Working Timees
  async getAllWorkingTime() {
    const listWorkingTime =
      await workingTimeRepo.getAllWorkingTime();
    if (listWorkingTime.length === 0) {
      return { data: "No Working Time Found", status: 404 };
    } else {
      return { data: listWorkingTime, status: 200 };
    }
  }

  // 2. Get Detail Working Time
  async getDetailWorkingTime(workingTimeId) {
    const detailWorkingTime =
      await workingTimeRepo.getDetailWorkingTime(workingTimeId);
    if (!detailWorkingTime) {
      return { data: "Working Time ID Not Found", status: 404 };
    } else {
      return { data: detailWorkingTime, status: 200 };
    }
  }

  // 3. Add Working Time
  async addWorkingTime(name) {
    if (!name) {
      return { data: "Working Time Name must not be blank", status: 406 };
    } else {
      const workingTimeInfo = {
        name: name,
      };
      await workingTimeRepo.addWorkingTime(workingTimeInfo);
      return { data: "Working Time Added", status: 200 };
    }
  }

  // 4. Delete Working Time
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

  // 5. Update Working Time
  async updateWorkingTime(name, workingTimeId) {
    const findWorkingTime = await workingTimeRepo.findWorkingTimeById(
      workingTimeId
    );
    if (!findWorkingTime) {
      return { data: "Working Time ID Not Found", status: 404 };
    }

    const dataWorkingTime = findWorkingTime.dataValues;

    const workingTimeInfo = {
      name: !name ? dataWorkingTime.name : name,
      updated_at: Date.now(),
    };

    await workingTimeRepo.updateWorkingTime(
      workingTimeInfo,
      workingTimeId
    );
    return { data: "Working Time Updated", status: 200 };
  }
}

module.exports = new WorkingTimeService();
