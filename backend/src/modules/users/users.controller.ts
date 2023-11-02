import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ConfigModule } from '@nestjs/config';
import { UsersEntity } from './database/entity/users.entity';
import { UserRegisterDTO } from './dto/register-user.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { UpdateAvatarDTO } from './dto/update-avatar.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { LoginDTO } from './dto/login.dto';
import { DataTokenInterface } from './interface/dataToken.interface';

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
  @Get('/detail/:userId')
  async getDetailUser(
    @Param('userId') userId: number,
  ): Promise<UsersEntity | unknown> {
    const result: UsersEntity | unknown =
      await this.usersService.getDetailUser(userId);
    return result;
  }

  // 3. Add Admin
  @Post('/add')
  async addAdmin(@Body() body: CreateAdminDTO): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.addAdmin(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:userId')
  async deleteUser(
    @Param('userId') userId: number,
  ): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.deleteUser(userId);
    return result;
  }

  // 5. Update
  @Patch('update/:userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() body: UpdateUserDTO,
  ): Promise<UsersEntity | unknown> {
    const result = await this.usersService.updateUser(userId, body);
    return result;
  }

  // 6. Signup
  @Post('/register')
  async userRegister(
    @Body() body: UserRegisterDTO,
  ): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.userRegister(body);
    return result;
  }

  // 7. Login
  @Post('login')
  async login(@Body() body: LoginDTO): Promise<DataTokenInterface | unknown> {
    const result: string | unknown = await this.usersService.login(body);
    return result;
  }

  // 8. Change Status User
  @Patch('/change-status-account/:userId')
  async changeStatus(
    @Param('userId') userId: number,
  ): Promise<UsersEntity | unknown> {
    const result: string | unknown =
      await this.usersService.changeStatus(userId);
    return result;
  }

  // 9. Change Password
  @Patch('/change-password/:userId')
  async changePassword(
    @Param('userId') userId: number,
    @Body() body: ChangePasswordDTO,
  ): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.changePassword(
      userId,
      body,
    );
    return result;
  }

  // 10. Add
  @Post('/create')
  async createUser(
    @Body() body: CreateAdminDTO,
  ): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.createUser(body);
    return result;
  }

  // 11. Edit Avatar
  @Patch('/edit-avatar/:userId')
  @FormDataRequest()
  async editAvatar(
    @Param('userId') userId: number,
    @Body() body: UpdateAvatarDTO,
  ) {
    const result: string | unknown = await this.usersService.editAvatar(
      userId,
      body,
    );
    return result;
  }
}
