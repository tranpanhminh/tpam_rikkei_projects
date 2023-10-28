import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostStatusesService } from './payments.service';
import { CreatePostStatusDTO } from './dto/create-payments.dto';
import { UpdatePostStatusDTO } from './dto/update-payments.dto';
import { ConfigModule } from '@nestjs/config';
import { PostStatusesEntity } from './database/entity/payments.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/post-statuses`)
export class PostStatusesController {
  constructor(private readonly postStatusesService: PostStatusesService) {}

  // 1. Get All
  @Get()
  async getAllPostsStatuses() {
    const result = await this.postStatusesService.getAllPostsStatuses();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailPostsStatus(
    @Param('id') id: number,
  ): Promise<PostStatusesEntity | unknown> {
    const result: PostStatusesEntity | unknown =
      await this.postStatusesService.getDetailPostsStatus(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addPostsStatus(
    @Body() body: CreatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    const result: string | unknown =
      await this.postStatusesService.addPostsStatus(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  async deletePostsStatus(
    @Param('id') id: number,
  ): Promise<PostStatusesEntity | unknown> {
    const result: string | unknown =
      await this.postStatusesService.deletePostsStatus(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  async updatePostsStatus(
    @Param('id') id: number,
    @Body() body: UpdatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    const result = await this.postStatusesService.updatePostsStatus(id, body);
    return result;
  }
}
