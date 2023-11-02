import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostsEntity } from "./database/entity/posts.entity";

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(PostsEntity)
    public postsEntity: Repository<PostsEntity>
  ) {}

  // 1. Get All
  async getAllPosts() {
    return await this.postsEntity.find();
  }

  // 2. Get Detail
  async getDetailPost(id: number): Promise<PostsEntity> {
    const detailPost = await this.postsEntity.findOneById(id);
    return detailPost;
  }

  // // 3. Add
  // async addPost(
  //   newPost: CreatePostDTO,
  // ): Promise<PostsEntity | unknown> {
  //   return await this.postsEntity.save(newPost);
  // }

  // // 4. Delete
  // async deletePost(id: number): Promise<PostsEntity | unknown> {
  //   return await this.postsEntity.delete(id);
  // }

  // // 5. Update
  // async updatePost(
  //   id: number,
  //   updatePost: UpdatePostDTO,
  // ): Promise<PostsEntity | unknown> {
  //   return await this.postsEntity.update(id, updatePost);
  // }

  // // 6. Check Bill To Apply Post
  // async checkBillToApplyPost(bill: number): Promise<unknown> {
  //   const listCounpons = this.postsEntity
  //     .createQueryBuilder('post')
  //     .select(['*'])
  //     .where('post.min_bill <= :bill', { bill })
  //     .orderBy('post.min_bill', 'DESC')
  //     .limit(1);
  //   const result = await listCounpons.getRawOne();
  //   return result;
  // }
}
