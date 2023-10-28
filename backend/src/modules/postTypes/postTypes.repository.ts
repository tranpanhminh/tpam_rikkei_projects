import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostStatusesEntity } from './database/entity/postTypes.entity';
import { CreatePostStatusDTO } from './dto/create-postType.dto';
import { UpdatePostStatusDTO } from './dto/update-postType.dto';

@Injectable()
export class PostStatusesRepository {
  constructor(
    @InjectRepository(PostStatusesEntity)
    private postStatusesEntity: Repository<PostStatusesEntity>,
  ) {}

  // 1. Get All
  async getAllPostsStatuses() {
    return await this.postStatusesEntity.find();
  }

  // 2. Get Detail
  async getDetailPostsStatus(id: number): Promise<PostStatusesEntity> {
    const detailPostsStatus = await this.postStatusesEntity.findOneById(id);
    return detailPostsStatus;
  }

  // 3. Add
  async addPostsStatus(
    newPostsStatus: CreatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    return await this.postStatusesEntity.save(newPostsStatus);
  }

  // 4. Add
  async deletePostsStatus(id: number): Promise<PostStatusesEntity | unknown> {
    return await this.postStatusesEntity.delete(id);
  }

  // 5. Update
  async updatePostsStatus(
    id: number,
    updatePostsStatus: UpdatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    return await this.postStatusesEntity.update(id, updatePostsStatus);
  }
}
