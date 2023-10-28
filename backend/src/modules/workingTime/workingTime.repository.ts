import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkingTimeEntity } from './database/entity/workingTime.entity';
import { CreateWorkingTimeDTO } from './dto/create-workingTime.dto';
import { UpdateWorkingTimeDTO } from './dto/update-workingTime.dto';

@Injectable()
export class WorkingTimeRepository {
  constructor(
    @InjectRepository(WorkingTimeEntity)
    private workingTimeEntity: Repository<WorkingTimeEntity>,
  ) {}

  // 1. Get All
  async getAllWorkingTime() {
    return await this.workingTimeEntity.find();
  }

  // 2. Get Detail
  async getDetailWorkingTime(id: number): Promise<WorkingTimeEntity> {
    const detailWorkingTime = await this.workingTimeEntity.findOneById(id);
    return detailWorkingTime;
  }

  // 3. Add
  async addWorkingTime(
    newWorkingTime: CreateWorkingTimeDTO,
  ): Promise<WorkingTimeEntity | unknown> {
    return await this.workingTimeEntity.save(newWorkingTime);
  }

  // 4. Add
  async deleteWorkingTime(id: number): Promise<WorkingTimeEntity | unknown> {
    return await this.workingTimeEntity.delete(id);
  }

  // 5. Update
  async updateWorkingTime(
    id: number,
    updateWorkingTime: UpdateWorkingTimeDTO,
  ): Promise<WorkingTimeEntity | unknown> {
    return await this.workingTimeEntity.update(id, updateWorkingTime);
  }
}
