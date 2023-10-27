import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsStatusesEntity } from './database/entity/postsStatuses.entity';
import { CreatePostStatusDTO } from './dto/create-postStatus.dto';
import { UpdatePostStatusDTO } from './dto/update-postStatus.dto';

@Injectable()
export class PostsStatusesRepository {
  constructor(
    @InjectRepository(PostsStatusesEntity)
    private postsStatusesEntity: Repository<PostsStatusesEntity>,
  ) {}

  // 1. Get All
  async getAllPostsStatuses() {
    return await this.postsStatusesEntity.find();
  }

  // 2. Get Detail
  async getDetailPostsStatus(id: number): Promise<PostsStatusesEntity> {
    const detailPostsStatus = await this.postsStatusesEntity.findOneById(id);
    return detailPostsStatus;
  }

  // 3. Add
  async addPostsStatus(
    newPostsStatus: CreatePostStatusDTO,
  ): Promise<PostsStatusesEntity | unknown> {
    return await this.postsStatusesEntity.save(newPostsStatus);
  }

  // 4. Add
  async deletePostsStatus(id: number): Promise<PostsStatusesEntity | unknown> {
    return await this.postsStatusesEntity.delete(id);
  }

  // 5. Update
  async updatePostsStatus(
    id: number,
    updatePostsStatus: UpdatePostStatusDTO,
  ): Promise<PostsStatusesEntity | unknown> {
    return await this.postsStatusesEntity.update(id, updatePostsStatus);
  }
}
