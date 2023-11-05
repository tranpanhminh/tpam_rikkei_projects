import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostTypesService } from './postTypes.service';
import { CreatePostStatusDTO } from './dto/create-postType.dto';
import { UpdatePostStatusDTO } from './dto/update-postType.dto';
import { ConfigModule } from '@nestjs/config';
import { PostTypesEntity } from './database/entity/postTypes.entity';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/post-types`)
export class PostTypesController {
  constructor(private readonly postTypesService: PostTypesService) {}

  // 1. Get All
  @Get()
  async getAllPostTypes() {
    const result = await this.postTypesService.getAllPostTypes();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailPostType(
    @Param('id') id: number,
  ): Promise<PostTypesEntity | unknown> {
    const result: PostTypesEntity | unknown =
      await this.postTypesService.getDetailPostType(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async addPostType(
    @Body() body: CreatePostStatusDTO,
  ): Promise<PostTypesEntity | unknown> {
    const result: string | unknown =
      await this.postTypesService.addPostType(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async deletePostType(
    @Param('id') id: number,
  ): Promise<PostTypesEntity | unknown> {
    const result: string | unknown =
      await this.postTypesService.deletePostType(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async updatePostType(
    @Param('id') id: number,
    @Body() body: UpdatePostStatusDTO,
  ): Promise<PostTypesEntity | unknown> {
    const result = await this.postTypesService.updatePostType(id, body);
    return result;
  }
}
