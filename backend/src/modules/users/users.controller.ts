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
import { UsersService } from './users.service';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ConfigModule } from '@nestjs/config';
import { UsersEntity } from './database/entity/users.entity';
import { CheckUserExist } from 'src/interceptors/checkUserExist';
import { CheckEmailExist } from 'src/interceptors/checkEmailExist';
import { UserRegisterDTO } from './dto/register-user.dto';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1. Get All
  @Get()
  async getAllUsers() {
    const result = await this.usersService.getAllUsers();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  @UseInterceptors(CheckUserExist)
  async getDetailUser(@Param('id') id: number): Promise<UsersEntity | unknown> {
    const result: UsersEntity | unknown =
      await this.usersService.getDetailUser(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addAdmin(@Body() body: CreateAdminDTO): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.addAdmin(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseInterceptors(CheckUserExist)
  async deleteUser(@Param('id') id: number): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.deleteUser(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseInterceptors(CheckUserExist)
  async updateUser(
    @Param('id') id: number,
    @Body() body: UpdateUserDTO,
  ): Promise<UsersEntity | unknown> {
    const result = await this.usersService.updateUser(id, body);
    return result;
  }

  // 6. Signup
  @Post('/register')
  @UseInterceptors(CheckEmailExist)
  async userRegister(
    @Body() body: UserRegisterDTO,
  ): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.userRegister(body);
    return result;
  }
}
