import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { ConfigModule } from "@nestjs/config";
import { PostsEntity } from "./database/entity/posts.entity";

ConfigModule.forRoot({
  envFilePath: ".env",
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/posts`)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1. Get All
  @Get()
  async getAllPosts() {
    const result = await this.postsService.getAllPosts();
    return result;
  }

  // 2. Get Detail
  @Get("/detail/:id")
  // @UseInterceptors(CheckPostExist)
  async getDetailPost(@Param("id") id: number): Promise<PostsEntity | unknown> {
    const result: PostsEntity | unknown = await this.postsService.getDetailPost(
      id
    );
    return result;
  }

  // // 3. Add
  // @Post('/add')
  // async addPost(
  //   @Body() body: CreatePostDTO,
  // ): Promise<PostsEntity | unknown> {
  //   const result: string | unknown = await this.postsService.addPost(body);
  //   return result;
  // }

  // // 4. Delete
  // @Delete('/delete/:id')
  // @UseInterceptors(CheckPostExist)
  // async deletePost(
  //   @Param('id') id: number,
  // ): Promise<PostsEntity | unknown> {
  //   const result: string | unknown = await this.postsService.deletePost(id);
  //   return result;
  // }

  // // 5. Update
  // @Patch('update/:id')
  // @UseInterceptors(CheckPostExist)
  // async updatePost(
  //   @Param('id') id: number,
  //   @Body() body: UpdatePostDTO,
  // ): Promise<PostsEntity | unknown> {
  //   const result = await this.postsService.updatePost(id, body);
  //   return result;
  // }
}
