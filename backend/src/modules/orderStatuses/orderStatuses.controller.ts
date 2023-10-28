import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserStatusesService } from './orderStatuses.service';
import { CreateUserStatusDTO } from './dto/create-orderStatus.dto';
import { UpdateUserStatusDTO } from './dto/update-orderStatus.dto';
import { ConfigModule } from '@nestjs/config';
import { UserStatusesEntity } from './database/entity/orderStatuses.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/user-statuses`)
export class UserStatusesController {
  constructor(private readonly userStatusesService: UserStatusesService) {}

  // 1. Get All
  @Get()
  async getAllUsersStatuses() {
    const result = await this.userStatusesService.getAllUsersStatuses();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailUsersStatus(
    @Param('id') id: number,
  ): Promise<UserStatusesEntity | unknown> {
    const result: UserStatusesEntity | unknown =
      await this.userStatusesService.getDetailUsersStatus(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addUsersStatus(
    @Body() body: CreateUserStatusDTO,
  ): Promise<UserStatusesEntity | unknown> {
    const result: string | unknown =
      await this.userStatusesService.addUsersStatus(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  async deleteUsersStatus(
    @Param('id') id: number,
  ): Promise<UserStatusesEntity | unknown> {
    const result: string | unknown =
      await this.userStatusesService.deleteUsersStatus(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  async updateUsersStatus(
    @Param('id') id: number,
    @Body() body: UpdateUserStatusDTO,
  ): Promise<UserStatusesEntity | unknown> {
    const result = await this.userStatusesService.updateUsersStatus(id, body);
    return result;
  }
}
