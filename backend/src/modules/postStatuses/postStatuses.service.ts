import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostStatusesRepository } from './postStatuses.repository';
import { PostStatusesEntity } from './database/entity/postStatuses.entity';
import { CreatePostStatusDTO } from './dto/create-postStatus.dto';
import { UpdatePostStatusDTO } from './dto/update-postStatus.dto';

@Injectable()
export class PostStatusesService {
  constructor(
    private readonly postStatusesRepository: PostStatusesRepository,
  ) {}

  // 1. Get All
  async getAllPostStatuses() {
    const result = await this.postStatusesRepository.getAllPostStatuses();
    return result;
  }

  // 2. Get Detail
  async getDetailPostStatus(id: number): Promise<PostStatusesEntity | unknown> {
    const detailPostStatus: PostStatusesEntity | unknown =
      await this.postStatusesRepository.getDetailPostStatus(id);
    if (detailPostStatus) {
      return detailPostStatus;
    } else {
      return new HttpException('PostStatus ID Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 3. Add
  async addPostStatus(
    body: CreatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    const { name } = body;
    const newPostStatus = {
      name: name,
    };
    await this.postStatusesRepository.addPostStatus(newPostStatus);
    return new HttpException('PostStatus Added', HttpStatus.OK);
  }

  // 4. Delete
  async deletePostStatus(id: number): Promise<PostStatusesEntity | unknown> {
    const checkPostStatus =
      await this.postStatusesRepository.getDetailPostStatus(id);
    if (checkPostStatus) {
      await this.postStatusesRepository.deletePostStatus(id);
      return new HttpException('PostStatus Deleted', HttpStatus.OK);
    } else {
      return new HttpException('PostStatus ID Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 5. Update
  async updatePostStatus(
    id: number,
    body: UpdatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    const { name } = body;
    const checkPostStatus: PostStatusesEntity =
      await this.postStatusesRepository.getDetailPostStatus(id);
    if (checkPostStatus) {
      const updatePostStatus = {
        name: !name ? checkPostStatus.name : name,
      };
      await this.postStatusesRepository.updatePostStatus(id, updatePostStatus);
      return new HttpException('PostStatus Updated', HttpStatus.OK);
    } else {
      return new HttpException('PostStatus ID Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
