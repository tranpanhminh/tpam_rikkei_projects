import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CancelReasonsEntity } from './database/entity/cancelReasons.entity';
import { CreateCancelReasonDTO } from './dto/createCancelReason.dto';
import { UpdateCancelReasonDTO } from './dto/updateCancelReason.dto';

@Injectable()
export class CancelReasonsRepository {
  constructor(
    @InjectRepository(CancelReasonsEntity)
    private cancelReasonsEntity: Repository<CancelReasonsEntity>,
  ) {}

  // 1. Get All
  async getAllCancelReasons() {
    return await this.cancelReasonsEntity.find();
  }

  // 2. Get Detail
  async getDetailCancelReason(id: number): Promise<CancelReasonsEntity> {
    const detailCancelReason = await this.cancelReasonsEntity.findOneById(id);
    return detailCancelReason;
  }

  // 3. Add
  async addCancelReason(
    newCancelReason: CreateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    return await this.cancelReasonsEntity.save(newCancelReason);
  }

  // 4. Add
  async deleteCancelReason(id: number): Promise<CancelReasonsEntity | unknown> {
    return await this.cancelReasonsEntity.delete(id);
  }

  // 5. Update
  async updateCancelReason(
    id: number,
    updateCancelReason: UpdateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    return await this.cancelReasonsEntity.update(id, updateCancelReason);
  }
}
