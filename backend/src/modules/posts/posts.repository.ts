import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity } from './database/entity/posts.entity';
import { PostsInterface } from './interface/posts.interface';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(PostsEntity)
    public postsEntity: Repository<PostsEntity>,
  ) {}

  // 1. Get All
  async getAllPosts() {
    return await this.postsEntity.find({ relations: { post_statuses: true } });
  }

  // 2. Get Detail
  async getDetailPost(id: number): Promise<PostsEntity> {
    const detailPost = await this.postsEntity.findOne({
      where: { id: id },
      relations: { post_statuses: true },
    });
    return detailPost;
  }

  // 3. Add
  async addPost(newPost: PostsInterface): Promise<PostsEntity | unknown> {
    return await this.postsEntity.save(newPost);
  }

  // 4. Delete
  async deletePost(id: number): Promise<PostsEntity | unknown> {
    return await this.postsEntity.delete(id);
  }

  // 5. Update
  async updatePost(
    id: number,
    updatePost: PostsInterface,
  ): Promise<PostsEntity | unknown> {
    return await this.postsEntity.update(id, updatePost);
  }
}
