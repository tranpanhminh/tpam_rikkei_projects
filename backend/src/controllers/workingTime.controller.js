const WorkingTimeService = require("../services/workingTime.service.js");

// ---------------------------------------------------------
class WorkingTimeController {
  // 1. Get All
  async getAllWorkingTime(req, res) {
    const result = await WorkingTimeService.getAllWorkingTime();
    return res.status(result.status).json(result.data);
  }

  // 2. Get Detail
  async getDetailWorkingTime(req, res) {
    const workingTimeId = req.params.workingTimeId;
    const result = await WorkingTimeService.getDetailWorkingTime(workingTimeId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add
  async addWorkingTime(req, res) {
    const dataBody = req.body;
    const result = await WorkingTimeService.addWorkingTime(dataBody);
    return res.status(result.status).json(result);
  }

  // 4. Delete Working Time
  async deleteWorkingTime(req, res) {
    const workingTimeId = req.params.workingTimeId;
    const result = await WorkingTimeService.deleteWorkingTime(workingTimeId);
    return res.status(result.status).json(result);
  }

  // 5. Update Working Time
  async updateWorkingTime(req, res) {
    const dataBody = req.body;
    const workingTimeId = req.params.workingTimeId;
    const result = await WorkingTimeService.updateWorkingTime(
      dataBody,
      workingTimeId
    );
    return res.status(result.status).json(result);
  }
}
module.exports = new WorkingTimeController();
