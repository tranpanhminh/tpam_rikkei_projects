import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsStatusesService } from './postsStatuses.service';
import { CreatePostStatusDTO } from './dto/create-postStatus.dto';
import { UpdatePostStatusDTO } from './dto/update-postStatus.dto';
import { ConfigModule } from '@nestjs/config';
import { PostsStatusesEntity } from './database/entity/postsStatuses.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/post-statuses`)
export class PostsStatusesController {
  constructor(private readonly postsStatusesService: PostsStatusesService) {}

  // 1. Get All
  @Get()
  async getAllPostsStatuses() {
    const result = await this.postsStatusesService.getAllPostsStatuses();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailPostsStatus(
    @Param('id') id: number,
  ): Promise<PostsStatusesEntity | unknown> {
    const result: PostsStatusesEntity | unknown =
      await this.postsStatusesService.getDetailPostsStatus(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addPostsStatus(
    @Body() body: CreatePostStatusDTO,
  ): Promise<PostsStatusesEntity | unknown> {
    const result: string | unknown =
      await this.postsStatusesService.addPostsStatus(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  async deletePostsStatus(
    @Param('id') id: number,
  ): Promise<PostsStatusesEntity | unknown> {
    const result: string | unknown =
      await this.postsStatusesService.deletePostsStatus(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  async updatePostsStatus(
    @Param('id') id: number,
    @Body() body: UpdatePostStatusDTO,
  ): Promise<PostsStatusesEntity | unknown> {
    const result = await this.postsStatusesService.updatePostsStatus(id, body);
    return result;
  }
}
