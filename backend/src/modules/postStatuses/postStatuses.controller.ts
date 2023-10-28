import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PostStatusesService } from './postStatuses.service';
import { CreatePostStatusDTO } from './dto/create-postStatus.dto';
import { UpdatePostStatusDTO } from './dto/update-postStatus.dto';
import { ConfigModule } from '@nestjs/config';
import { PostStatusesEntity } from './database/entity/postStatuses.entity';
import { CheckPostStatusExist } from 'src/interceptors/checkPostStatusExist';

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
  async getAllPostStatuses() {
    const result = await this.postStatusesService.getAllPostStatuses();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  @UseInterceptors(CheckPostStatusExist)
  async getDetailPostStatus(
    @Param('id') id: number,
  ): Promise<PostStatusesEntity | unknown> {
    const result: PostStatusesEntity | unknown =
      await this.postStatusesService.getDetailPostStatus(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addPostStatus(
    @Body() body: CreatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    const result: string | unknown =
      await this.postStatusesService.addPostStatus(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseInterceptors(CheckPostStatusExist)
  async deletePostStatus(
    @Param('id') id: number,
  ): Promise<PostStatusesEntity | unknown> {
    const result: string | unknown =
      await this.postStatusesService.deletePostStatus(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseInterceptors(CheckPostStatusExist)
  async updatePostStatus(
    @Param('id') id: number,
    @Body() body: UpdatePostStatusDTO,
  ): Promise<PostStatusesEntity | unknown> {
    const result = await this.postStatusesService.updatePostStatus(id, body);
    return result;
  }
}
