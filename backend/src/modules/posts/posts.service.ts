import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PostsRepository } from "./posts.repository";
import { PostsEntity } from "./database/entity/posts.entity";
import { CreatePostDTO } from "./dto/create-post.dto";
import { UpdatePostDTO } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  // 1. Get All
  async getAllPosts() {
    const result = await this.postsRepository.getAllPosts();
    return result;
  }

  // 2. Get Detail
  async getDetailPost(id: number): Promise<PostsEntity | unknown> {
    const detailPost: PostsEntity | unknown =
      await this.postsRepository.getDetailPost(id);
    if (detailPost) {
      return detailPost;
    }
  }

  // // 3. Add
  // async addPost(body: CreatePostDTO): Promise<PostsEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const newPost = {
  //     name: name,
  //     code: code,
  //     discount_rate: discount_rate,
  //     min_bill: min_bill,
  //   };
  //   await this.postsRepository.addPost(newPost);
  //   return new HttpException('Post Added', HttpStatus.OK);
  // }

  // // 4. Delete
  // async deletePost(id: number): Promise<PostsEntity | unknown> {
  //   const checkPost = await this.postsRepository.getDetailPost(id);
  //   if (checkPost) {
  //     await this.postsRepository.deletePost(id);
  //     return new HttpException('Post Deleted', HttpStatus.OK);
  //   }
  // }

  // // 5. Update
  // async updatePost(
  //   id: number,
  //   body: UpdatePostDTO,
  // ): Promise<PostsEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const checkPost: PostsEntity =
  //     await this.postsRepository.getDetailPost(id);
  //   if (checkPost) {
  //     const updatePost = {
  //       name: !name ? checkPost.name : name,
  //       code: !code ? checkPost.code : code,
  //       discount_rate: !discount_rate
  //         ? checkPost.discount_rate
  //         : discount_rate,
  //       min_bill: !min_bill ? checkPost.min_bill : min_bill,
  //     };
  //     await this.postsRepository.updatePost(id, updatePost);
  //     return new HttpException('Post Updated', HttpStatus.OK);
  //   }
  // }
}
