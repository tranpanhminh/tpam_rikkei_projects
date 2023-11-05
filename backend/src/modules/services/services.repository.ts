import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesEntity } from './database/entity/services.entity';
import { ServicesInterface } from './interface/services.interface';

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectRepository(ServicesEntity)
    public servicesEntity: Repository<ServicesEntity>,
  ) {}

  // 1. Get All
  async getAllServices() {
    return await this.servicesEntity.find({
      relations: { working_time: true },
    });
  }

  // 2. Get Detail
  async getDetailService(id: number): Promise<ServicesEntity> {
    const detailService = await this.servicesEntity.findOne({
      where: { id: id },
      relations: { working_time: true },
    });
    return detailService;
  }

  // 3. Add
  async addService(
    newService: ServicesInterface,
  ): Promise<ServicesEntity | unknown> {
    return await this.servicesEntity.save(newService);
  }

  // 4. Delete
  async deleteService(id: number): Promise<ServicesEntity | unknown> {
    return await this.servicesEntity.delete(id);
  }

  // 5. Update
  async updateService(
    id: number,
    updateService: ServicesInterface,
  ): Promise<ServicesEntity | unknown> {
    return await this.servicesEntity.update(id, updateService);
  }
}
