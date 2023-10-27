import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CancelReasonsEntity } from './database/entity/cancelReasons.entity';
import { CreateCancelReasonDTO } from './dto/create-cancelReason.dto';
import { UpdateCancelReasonDTO } from './dto/update-cancelReason.dto';

@Injectable()
export class CancelReasonsRepository {
  constructor(
    @InjectRepository(CancelReasonsEntity)
    private cancelReasonsEntity: Repository<CancelReasonsEntity>,
  ) {}

  // 1. Get All
  async getAllPostsStatuses() {
    return await this.cancelReasonsEntity.find();
  }

  // 2. Get Detail
  async getDetailPostsStatus(id: number): Promise<CancelReasonsEntity> {
    const detailPostsStatus = await this.cancelReasonsEntity.findOneById(id);
    return detailPostsStatus;
  }

  // 3. Add
  async addPostsStatus(
    newPostsStatus: CreateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    return await this.cancelReasonsEntity.save(newPostsStatus);
  }

  // 4. Add
  async deletePostsStatus(id: number): Promise<CancelReasonsEntity | unknown> {
    return await this.cancelReasonsEntity.delete(id);
  }

  // 5. Update
  async updatePostsStatus(
    id: number,
    updatePostsStatus: UpdateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    return await this.cancelReasonsEntity.update(id, updatePostsStatus);
  }
}
