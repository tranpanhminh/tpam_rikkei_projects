import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostTypesEntity } from "./database/entity/postTypes.entity";
import { CreatePostStatusDTO } from "./dto/create-postType.dto";
import { UpdatePostStatusDTO } from "./dto/update-postType.dto";

@Injectable()
export class PostTypesRepository {
  constructor(
    @InjectRepository(PostTypesEntity)
    private postTypesEntity: Repository<PostTypesEntity>
  ) {}

  // 1. Get All
  async getAllPostTypes() {
    return await this.postTypesEntity.find();
  }

  // 2. Get Detail
  async getDetailPostType(id: number): Promise<PostTypesEntity> {
    const detailPostType = await this.postTypesEntity.findOneById(id);
    return detailPostType;
  }

  // 3. Add
  async addPostType(
    newPostType: CreatePostStatusDTO
  ): Promise<PostTypesEntity | unknown> {
    return await this.postTypesEntity.save(newPostType);
  }

  // 4. Add
  async deletePostType(id: number): Promise<PostTypesEntity | unknown> {
    return await this.postTypesEntity.delete(id);
  }

  // 5. Update
  async updatePostType(
    id: number,
    updatePostType: UpdatePostStatusDTO
  ): Promise<PostTypesEntity | unknown> {
    return await this.postTypesEntity.update(id, updatePostType);
  }
}
