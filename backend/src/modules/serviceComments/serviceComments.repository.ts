import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCommentsEntity } from './database/entity/serviceComments.entity';
import { ServiceCommentsInterface } from './interface/serviceComments.interface';

@Injectable()
export class ServiceCommentsRepository {
  constructor(
    @InjectRepository(ServiceCommentsEntity)
    public serviceCommentsEntity: Repository<ServiceCommentsEntity>,
  ) {}

  // 1. Get All
  async getAllServiceComments() {
    return await this.serviceCommentsEntity.find();
  }

  // 2. Get Detail
  async getDetailServiceComment(id: number): Promise<ServiceCommentsEntity> {
    const detailServiceComment =
      await this.serviceCommentsEntity.findOneById(id);
    return detailServiceComment;
  }

  // 3. Add
  async addServiceComment(
    newServiceComment: ServiceCommentsInterface,
  ): Promise<ServiceCommentsEntity | unknown> {
    return await this.serviceCommentsEntity.save(newServiceComment);
  }

  // 4. Delete
  async deleteServiceComment(
    id: number,
  ): Promise<ServiceCommentsEntity | unknown> {
    return await this.serviceCommentsEntity.delete(id);
  }

  // 5. Get All Comments By Product
  async getAllCommentsByService(
    id: number,
  ): Promise<ServiceCommentsEntity | unknown> {
    return await this.serviceCommentsEntity.find({ where: { post_id: id } });
  }
}
