import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesEntity } from './database/entity/services.entity';

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectRepository(ServicesEntity)
    public servicesEntity: Repository<ServicesEntity>,
  ) {}

  // 1. Get All
  async getAllServices() {
    return await this.servicesEntity.find();
  }

  // 2. Get Detail
  async getDetailService(id: number): Promise<ServicesEntity> {
    const detailService = await this.servicesEntity.findOneById(id);
    return detailService;
  }

  // 3. Add
  // async addService(
  //   newService: CreateServiceDTO
  // ): Promise<ServicesEntity | unknown> {
  //   return await this.servicesEntity.save(newService);
  // }

  // 4. Add
  // async deleteService(id: number): Promise<ServicesEntity | unknown> {
  //   return await this.servicesEntity.delete(id);
  // }

  // 5. Update
  // async updateService(
  //   id: number,
  //   updateService: UpdateServiceDTO
  // ): Promise<ServicesEntity | unknown> {
  //   return await this.servicesEntity.update(id, updateService);
  // }

  // 6. Check Bill To Apply Service
  // async checkBillToApplyService(bill: number): Promise<unknown> {
  //   const listCounpons = this.servicesEntity
  //     .createQueryBuilder("service")
  //     .select(["*"])
  //     .where("service.min_bill <= :bill", { bill })
  //     .orderBy("service.min_bill", "DESC")
  //     .limit(1);
  //   const result = await listCounpons.getRawOne();
  //   return result;
  // }
}
