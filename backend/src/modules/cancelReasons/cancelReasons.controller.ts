import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CancelReasonsService } from './cancelReasons.service';
import { CreateCancelReasonDTO } from './dto/create-cancelReason.dto';
import { UpdateCancelReasonDTO } from './dto/update-cancelReason.dto';
import { ConfigModule } from '@nestjs/config';
import { CancelReasonsEntity } from './database/entity/cancelReasons.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/cancel-reasons`)
export class CancelReasonsController {
  constructor(private readonly cancelReasonsService: CancelReasonsService) {}

  // 1. Get All
  @Get()
  async getAllPostsStatuses() {
    const result = await this.cancelReasonsService.getAllPostsStatuses();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailPostsStatus(
    @Param('id') id: number,
  ): Promise<CancelReasonsEntity | unknown> {
    const result: CancelReasonsEntity | unknown =
      await this.cancelReasonsService.getDetailPostsStatus(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addPostsStatus(
    @Body() body: CreateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    const result: string | unknown =
      await this.cancelReasonsService.addPostsStatus(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  async deletePostsStatus(
    @Param('id') id: number,
  ): Promise<CancelReasonsEntity | unknown> {
    const result: string | unknown =
      await this.cancelReasonsService.deletePostsStatus(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  async updatePostsStatus(
    @Param('id') id: number,
    @Body() body: UpdateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    const result = await this.cancelReasonsService.updatePostsStatus(id, body);
    return result;
  }
}
