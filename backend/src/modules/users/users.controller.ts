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
import { UsersService } from './users.service';
import { CreateAdminDTO } from './dto/createAdmin.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { ConfigModule } from '@nestjs/config';
import { UsersEntity } from './database/entity/users.entity';
import { UserRegisterDTO } from './dto/registerUser.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { UpdateAvatarDTO } from './dto/updateAvatar.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { LoginDTO } from './dto/login.dto';
import { DataTokenInterface } from './interface/dataToken.interface';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

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
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async getAllUsers() {
    const result = await this.usersService.getAllUsers();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:userId')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async getDetailUser(
    @Param('userId') userId: number,
  ): Promise<UsersEntity | unknown> {
    const result: UsersEntity | unknown =
      await this.usersService.getDetailUser(userId);
    return result;
  }

  // 3. Add Admin
  @Post('/add')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async addAdmin(@Body() body: CreateAdminDTO): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.addAdmin(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:userId')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async deleteUser(
    @Param('userId') userId: number,
  ): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.deleteUser(userId);
    return result;
  }

  // 5. Update
  @Patch('update/:userId')
  @UseGuards(AuthenticationGuard)
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
  @Post('/login')
  async login(@Body() body: LoginDTO): Promise<DataTokenInterface | unknown> {
    const result: DataTokenInterface | unknown =
      await this.usersService.login(body);
    return result;
  }

  // 8. Change Status User
  @Patch('/change-status-account/:userId')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
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
  @UseGuards(AuthenticationGuard)
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
