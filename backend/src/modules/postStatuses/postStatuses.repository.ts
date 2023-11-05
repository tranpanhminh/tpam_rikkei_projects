import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostStatusesEntity } from './database/entity/postStatuses.entity';
import { CreatePostStatusDTO } from './dto/createPostStatus.dto';
import { UpdatePostStatusDTO } from './dto/updatePostStatus.dto';

@Injectable()
export class PostStatusesRepository {
  constructor(
    @InjectRepository(PostStatusesEntity)
    private postStatusesEntity: Repository<PostStatusesEntity>,
  ) {}

  // 1. Get All
  async getAllPostStatuses() {
    return await this.postStatusesEntity.find();
  }

  // 2. Get Detail
  async getDetailPostStatus(id: number): Promise<PostStatusesEntity> {
    const detailPostStatus = await this.postStatusesEntity.findOneById(id);
    return detailPostStatus;
  }

  // 3. Add
  async addPostStatus(
    newPostStatus: CreatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    return await this.postStatusesEntity.save(newPostStatus);
  }

  // 4. Add
  async deletePostStatus(id: number): Promise<PostStatusesEntity | unknown> {
    return await this.postStatusesEntity.delete(id);
  }

  // 5. Update
  async updatePostStatus(
    id: number,
    updatePostStatus: UpdatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    return await this.postStatusesEntity.update(id, updatePostStatus);
  }
}
