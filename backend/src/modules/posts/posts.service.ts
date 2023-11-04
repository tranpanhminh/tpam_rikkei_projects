import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { PostsEntity } from './database/entity/posts.entity';
import { PostsInterface } from './interface/posts.interface';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { extractPublicId } from 'cloudinary-build-url';
const cloudinary = require('cloudinary').v2;

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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

  // 3. Add
  async addPost(body: CreatePostDTO): Promise<PostsEntity | unknown> {
    const { title, content, author, status_id } = body;
    const fileUpload: any = body.thumbnail_url;
    const file = await this.cloudinaryService.uploadFile(fileUpload);
    const newPost: PostsInterface = {
      title: title,
      content: content,
      thumbnail_url: file.secure_url,
      author: author,
      status_id: status_id,
      post_type_id: 3,
    };
    await this.postsRepository.addPost(newPost);
    return new HttpException('Post Added', HttpStatus.OK);
  }

  // 4. Delete
  async deletePost(id: number): Promise<PostsEntity | unknown> {
    const checkPost = await this.postsRepository.getDetailPost(id);
    if (checkPost) {
      const publicId = extractPublicId(checkPost.thumbnail_url);
      await cloudinary.api.delete_resources(publicId);
      await this.postsRepository.deletePost(id);
      return new HttpException('Post Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updatePost(
    id: number,
    body: UpdatePostDTO,
  ): Promise<PostsEntity | unknown> {
    const { title, content, author, status_id } = body;
    const checkPost = await this.postsRepository.getDetailPost(id);

    console.log(checkPost);
    if (body.thumbnail_url) {
      const fileUpload: any = body.thumbnail_url;
      const file = await this.cloudinaryService.uploadFile(fileUpload);
      const updatePost: PostsInterface = {
        title: !title ? checkPost.title : title,
        content: !content ? checkPost.content : content,
        thumbnail_url: file.secure_url,
        author: !author ? checkPost.author : author,
        status_id: !status_id ? checkPost.status_id : status_id,
        post_type_id: 3,
      };

      // Xóa ảnh cũ
      const publicId = extractPublicId(checkPost.thumbnail_url);
      await cloudinary.api.delete_resources(publicId);
      await this.postsRepository.updatePost(id, updatePost);
      return new HttpException('Post Updated', HttpStatus.OK);
    } else {
      const updatePost: PostsInterface = {
        title: !title ? checkPost.title : title,
        content: !content ? checkPost.content : content,
        thumbnail_url: checkPost.thumbnail_url,
        author: !author ? checkPost.author : author,
        status_id: !status_id ? checkPost.status_id : status_id,
        post_type_id: 3,
      };

      // Xóa ảnh cũ
      const publicId = extractPublicId(checkPost.thumbnail_url);
      await cloudinary.api.delete_resources(publicId);
      await this.postsRepository.updatePost(id, updatePost);
      return new HttpException('Post Updated', HttpStatus.OK);
    }
  }
}
