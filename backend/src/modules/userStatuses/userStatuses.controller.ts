import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserStatusesService } from './userStatuses.service';
import { CreateUserStatusDTO } from './dto/create-userStatus.dto';
import { UpdateUserStatusDTO } from './dto/update-userStatus.dto';
import { ConfigModule } from '@nestjs/config';
import { UserStatusesEntity } from './database/entity/userStatuses.entity';

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
  async getAllUserStatuses() {
    const result = await this.userStatusesService.getAllUserStatuses();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailUserStatus(
    @Param('id') id: number,
  ): Promise<UserStatusesEntity | unknown> {
    const result: UserStatusesEntity | unknown =
      await this.userStatusesService.getDetailUserStatus(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addUserStatus(
    @Body() body: CreateUserStatusDTO,
  ): Promise<UserStatusesEntity | unknown> {
    const result: string | unknown =
      await this.userStatusesService.addUserStatus(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  async deleteUserStatus(
    @Param('id') id: number,
  ): Promise<UserStatusesEntity | unknown> {
    const result: string | unknown =
      await this.userStatusesService.deleteUserStatus(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  async updateUserStatus(
    @Param('id') id: number,
    @Body() body: UpdateUserStatusDTO,
  ): Promise<UserStatusesEntity | unknown> {
    const result = await this.userStatusesService.updateUserStatus(id, body);
    return result;
  }
}
