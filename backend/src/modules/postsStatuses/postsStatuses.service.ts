import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsStatusesRepository } from './postsStatuses.repository';
import { PostsStatusesEntity } from './database/entity/postsStatuses.entity';
import { CreatePostStatusDTO } from './dto/create-postStatus.dto';
import { UpdatePostStatusDTO } from './dto/update-postStatus.dto';

@Injectable()
export class PostsStatusesService {
  constructor(
    private readonly postsStatusesRepository: PostsStatusesRepository,
  ) {}

  // 1. Get All
  async getAllPostsStatuses() {
    const result = await this.postsStatusesRepository.getAllPostsStatuses();
    return result;
  }

  // 2. Get Detail
  async getDetailPostsStatus(
    id: number,
  ): Promise<PostsStatusesEntity | unknown> {
    const detailPostsStatus: PostsStatusesEntity | unknown =
      await this.postsStatusesRepository.getDetailPostsStatus(id);
    if (detailPostsStatus) {
      return detailPostsStatus;
    } else {
      return new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  // 3. Add
  async addPostsStatus(
    body: CreatePostStatusDTO,
  ): Promise<PostsStatusesEntity | unknown> {
    const { name } = body;
    console.log(body, 'AFAS');
    const newPostsStatus = {
      name: name,
    };
    await this.postsStatusesRepository.addPostsStatus(newPostsStatus);
    return new HttpException('PostsStatus Added', HttpStatus.OK);
  }

  // 4. Delete
  async deletePostsStatus(id: number): Promise<PostsStatusesEntity | unknown> {
    const checkPostsStatus =
      await this.postsStatusesRepository.getDetailPostsStatus(id);
    if (checkPostsStatus) {
      await this.postsStatusesRepository.deletePostsStatus(id);
      return new HttpException('PostsStatus Deleted', HttpStatus.OK);
    } else {
      return new HttpException(
        'PostsStatus ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // 5. Update
  async updatePostsStatus(
    id: number,
    body: UpdatePostStatusDTO,
  ): Promise<PostsStatusesEntity | unknown> {
    const { name } = body;
    const checkPostsStatus: PostsStatusesEntity =
      await this.postsStatusesRepository.getDetailPostsStatus(id);
    if (checkPostsStatus) {
      const updatePostsStatus = {
        name: !name ? checkPostsStatus.name : name,
      };
      await this.postsStatusesRepository.updatePostsStatus(
        id,
        updatePostsStatus,
      );
      return new HttpException('PostsStatus Updated', HttpStatus.OK);
    } else {
      return new HttpException(
        'PostsStatus ID Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
