import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostTypesRepository } from './postTypes.repository';
import { PostTypesEntity } from './database/entity/postTypes.entity';
import { CreatePostStatusDTO } from './dto/create-postType.dto';
import { UpdatePostStatusDTO } from './dto/update-postType.dto';

@Injectable()
export class PostTypesService {
  constructor(private readonly postTypesRepository: PostTypesRepository) {}

  // 1. Get All
  async getAllPostTypes() {
    const result = await this.postTypesRepository.getAllPostTypes();
    return result;
  }

  // 2. Get Detail
  async getDetailPostType(id: number): Promise<PostTypesEntity | unknown> {
    const detailPostType: PostTypesEntity | unknown =
      await this.postTypesRepository.getDetailPostType(id);
    if (detailPostType) {
      return detailPostType;
    }
  }

  // 3. Add
  async addPostType(
    body: CreatePostStatusDTO,
  ): Promise<PostTypesEntity | unknown> {
    const { name } = body;
    const newPostType = {
      name: name,
    };
    await this.postTypesRepository.addPostType(newPostType);
    return new HttpException('PostStatus Added', HttpStatus.OK);
  }

  // 4. Delete
  async deletePostType(id: number): Promise<PostTypesEntity | unknown> {
    const checkPostType = await this.postTypesRepository.getDetailPostType(id);
    if (checkPostType) {
      await this.postTypesRepository.deletePostType(id);
      return new HttpException('PostStatus Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updatePostType(
    id: number,
    body: UpdatePostStatusDTO,
  ): Promise<PostTypesEntity | unknown> {
    const { name } = body;
    const checkPostType: PostTypesEntity =
      await this.postTypesRepository.getDetailPostType(id);
    if (checkPostType) {
      const updatePostType = {
        name: !name ? checkPostType.name : name,
      };
      await this.postTypesRepository.updatePostType(id, updatePostType);
      return new HttpException('PostStatus Updated', HttpStatus.OK);
    }
  }
}
