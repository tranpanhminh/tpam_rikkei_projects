import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersStatusesService } from './usersStatuses.service';
import { CreateUserStatusDTO } from './dto/create-userStatus.dto';
import { UpdateUserStatusDTO } from './dto/update-userStatus.dto';
import { ConfigModule } from '@nestjs/config';
import { UsersStatusesEntity } from './database/entity/usersStatuses.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
console.log(path, '-s');
@Controller(`${path}/user-statuses`)
export class UsersStatusesController {
  constructor(private readonly usersStatusesService: UsersStatusesService) {}

  // 1. Get All
  @Get()
  async getAllUsersStatuses() {
    const result = await this.usersStatusesService.getAllUsersStatuses();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailUsersStatus(
    @Param('id') id: number,
  ): Promise<UsersStatusesEntity | unknown> {
    const result: UsersStatusesEntity | unknown =
      await this.usersStatusesService.getDetailUsersStatus(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addUsersStatus(
    @Body() body: CreateUserStatusDTO,
  ): Promise<UsersStatusesEntity | unknown> {
    const result: string | unknown =
      await this.usersStatusesService.addUsersStatus(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  async deleteUsersStatus(
    @Param('id') id: number,
  ): Promise<UsersStatusesEntity | unknown> {
    const result: string | unknown =
      await this.usersStatusesService.deleteUsersStatus(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  async updateUsersStatus(
    @Param('id') id: number,
    @Body() body: UpdateUserStatusDTO,
  ): Promise<UsersStatusesEntity | unknown> {
    const result = await this.usersStatusesService.updateUsersStatus(id, body);
    return result;
  }
}
