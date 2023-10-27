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
  async getAllPostsStatuses() {
    const result = await this.postStatusesRepository.getAllPostsStatuses();
    return result;
  }

  // 2. Get Detail
  async getDetailPostsStatus(
    id: number,
  ): Promise<PostStatusesEntity | unknown> {
    const detailPostsStatus: PostStatusesEntity | unknown =
      await this.postStatusesRepository.getDetailPostsStatus(id);
    if (detailPostsStatus) {
      return detailPostsStatus;
    } else {
      return new HttpException('PostStatus ID Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 3. Add
  async addPostsStatus(
    body: CreatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    const { name } = body;
    console.log(body, 'AFAS');
    const newPostsStatus = {
      name: name,
    };
    await this.postStatusesRepository.addPostsStatus(newPostsStatus);
    return new HttpException('PostStatus Added', HttpStatus.OK);
  }

  // 4. Delete
  async deletePostsStatus(id: number): Promise<PostStatusesEntity | unknown> {
    const checkPostsStatus =
      await this.postStatusesRepository.getDetailPostsStatus(id);
    if (checkPostsStatus) {
      await this.postStatusesRepository.deletePostsStatus(id);
      return new HttpException('PostStatus Deleted', HttpStatus.OK);
    } else {
      return new HttpException('PostStatus ID Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 5. Update
  async updatePostsStatus(
    id: number,
    body: UpdatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    const { name } = body;
    const checkPostsStatus: PostStatusesEntity =
      await this.postStatusesRepository.getDetailPostsStatus(id);
    if (checkPostsStatus) {
      const updatePostsStatus = {
        name: !name ? checkPostsStatus.name : name,
      };
      await this.postStatusesRepository.updatePostsStatus(
        id,
        updatePostsStatus,
      );
      return new HttpException('PostStatus Updated', HttpStatus.OK);
    } else {
      return new HttpException('PostStatus ID Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
