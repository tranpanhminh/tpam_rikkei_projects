import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WorkingTimeRepository } from './workingTime.repository';
import { WorkingTimeEntity } from './database/entity/workingTime.entity';
import { CreateWorkingTimeDTO } from './dto/createWorkingTime';
import { UpdateWorkingTimeDTO } from './dto/updateWorkingTime';

@Injectable()
export class WorkingTimeService {
  constructor(private readonly workingTimeRepository: WorkingTimeRepository) {}

  // 1. Get All
  async getAllWorkingTime() {
    const result = await this.workingTimeRepository.getAllWorkingTime();
    return result;
  }

  // 2. Get Detail
  async getDetailWorkingTime(id: number): Promise<WorkingTimeEntity | unknown> {
    const detailWorkingTime: WorkingTimeEntity | unknown =
      await this.workingTimeRepository.getDetailWorkingTime(id);
    if (detailWorkingTime) {
      return detailWorkingTime;
    }
  }

  // 3. Add
  async addWorkingTime(
    body: CreateWorkingTimeDTO,
  ): Promise<WorkingTimeEntity | unknown> {
    const { morning_time, afternoon_time } = body;
    const newWorkingTime = {
      morning_time: morning_time,
      afternoon_time: afternoon_time,
    };
    await this.workingTimeRepository.addWorkingTime(newWorkingTime);
    return new HttpException('WorkingTime Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteWorkingTime(id: number): Promise<WorkingTimeEntity | unknown> {
    const checkWorkingTime =
      await this.workingTimeRepository.getDetailWorkingTime(id);
    if (checkWorkingTime) {
      await this.workingTimeRepository.deleteWorkingTime(id);
      return new HttpException('WorkingTime Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updateWorkingTime(
    id: number,
    body: UpdateWorkingTimeDTO,
  ): Promise<WorkingTimeEntity | unknown> {
    const { morning_time, afternoon_time } = body;
    const checkWorkingTime: WorkingTimeEntity =
      await this.workingTimeRepository.getDetailWorkingTime(id);
    if (checkWorkingTime) {
      const updateWorkingTime = {
        morning_time: !morning_time
          ? checkWorkingTime.morning_time
          : morning_time,
        afternoon_time: !afternoon_time
          ? checkWorkingTime.afternoon_time
          : afternoon_time,
      };
      await this.workingTimeRepository.updateWorkingTime(id, updateWorkingTime);
      return new HttpException('WorkingTime Updated', HttpStatus.OK);
    }
  }
}
