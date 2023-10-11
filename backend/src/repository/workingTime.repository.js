const workingTimeEntity = require("../entities/workingTime.entity.js");

// ---------------------------------------------------------
class WorkingTimeRepo {
  async findWorkingTimeById(workingTimeId) {
    const findWorkingTime = await workingTimeEntity.findOne({
      where: { id: workingTimeId },
    });
    return findWorkingTime;
  }

  // 1. Get All Booking Statuses
  async getAllWorkingTime() {
    const listWorkingTime = await workingTimeEntity.findAll();
    return listWorkingTime;
  }

  // // 2. Get Detail Booking Status
  async getDetailWorkingTime(workingTimeId) {
    const findWorkingTime = await workingTimeEntity.findOne({
      where: { id: workingTimeId },
    });
    return findWorkingTime;
  }

  // 3. Add Booking Status
  async addWorkingTime(workingTimeInfo) {
    const newWorkingTime = await workingTimeEntity.create(workingTimeInfo);
    return newWorkingTime;
  }

  // 4. Delete Booking Status
  async deleteWorkingTime(workingTimeId) {
    const deleteWorkingTime = await workingTimeEntity.destroy({
      where: { id: workingTimeId },
    });
    return deleteWorkingTime;
  }

  // 5. Update Booking Status
  async updateWorkingTime(workingTimeInfo, workingTimeId) {
    const updatedWorkingTime = await workingTimeEntity.update(workingTimeInfo, {
      where: { id: workingTimeId },
    });
    return updatedWorkingTime;
  }
}

module.exports = new WorkingTimeRepo();
